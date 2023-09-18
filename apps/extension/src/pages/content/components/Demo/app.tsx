import supportEmojis from "@assets/supported_emojis.json";
import savedEmojisStorage from "@root/src/shared/storages/savedEmojiStorage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("content view loaded");

    // Append save emoji button
    const container = document.querySelector(".ZRmW8c");
    if (!container) return;

    const saveBtn = document.createElement("div");
    saveBtn.classList.add("imjQdf");

    const innerText = "Lưu emoji";
    const innerHTML = `<div class="ToU0Lb"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg></div><span class="t6NJlf">${innerText}</span>`;
    saveBtn.innerHTML = innerHTML;

    saveBtn.addEventListener("click", () => {
      const url = (document.querySelector("img.hMW4xf") as HTMLImageElement)
        ?.src;
      // TODO: show alert or something
      if (!url) return;

      const regex = /\/(.+\/)*(.+)\.(.+)$/;
      const mixedString = regex.exec(url)[2];
      console.log("🚀 ~ saving:", mixedString);
      const [emoji1, emoji2] = mixedString.split("_") as [string, string];

      const foundEmoji = supportEmojis.find((_) => _.emojiUnicode === emoji1);
      if (!foundEmoji)
        return alert(
          "Chưa hỗ trợ emoji hiện tại, vui lòng liên hệ tác giả để thêm."
        );

      savedEmojisStorage.add([emoji1, emoji2]);
    });

    container.appendChild(saveBtn);
  }, []);

  return <div className="text-lime-400">content view</div>;
}
