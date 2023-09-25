import supportEmojis from "@assets/supported_emojis.json";
import { MessageType } from "@root/src/extension/messages";
import { onMessage } from "@root/src/extension/runtime";
import savedEmojisStorage from "@root/src/shared/storages/savedEmojiStorage";
import { useEffect, useState } from "react";

export type CustomDomRect = Partial<DOMRect>;

const appendSaveButton = () => {
  // Append save emoji button
  const container = document.querySelector(".ZRmW8c");
  if (!container) return;

  const saveBtn = document.createElement("div");
  saveBtn.classList.add("imjQdf");

  const innerText = "Lưu emoji";
  const innerHTML = `<div class="ToU0Lb"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg></div><span class="t6NJlf">${innerText}</span>`;
  saveBtn.innerHTML = innerHTML;

  saveBtn.addEventListener("click", () => {
    const url = (document.querySelector("img.hMW4xf") as HTMLImageElement)?.src;
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
};

async function parseClipboardData(container: Element) {
  const items = await navigator.clipboard.read().catch((err) => {
    console.error(err);
  });
  if (!items) return;

  for (const clipboardItem of items) {
    for (const type of clipboardItem.types) {
      if (type.startsWith("image/")) {
        // clipboardItem.getType(type).then((imageBlob) => {
        //   const image = `<img src="${window.URL.createObjectURL(
        //     imageBlob
        //   )}" />`;
        //   container.innerHTML = image;

        // Step 2: Create a paste event
        const pasteEvent = new ClipboardEvent("paste", {
          bubbles: true, // You may or may not want to bubble the event
          cancelable: true, // You may or may not want to cancel the event
        });

        // Step 3 (optional): Set clipboardData to simulate pasted data
        const clipboardData = new DataTransfer();
        clipboardData.setData("text/plain", "Pasted text goes here"); // You can set the data you want to paste

        // Set clipboardData property in the paste event
        Object.defineProperty(pasteEvent, "clipboardData", {
          value: clipboardData,
        });

        // Dispatch the paste event on the contenteditable element
        container.dispatchEvent(pasteEvent);
      }

      return true;
    }
  }
}

export default function App() {
  useEffect(() => {
    appendSaveButton();
    try {
      // document.addEventListener("click", async (e) => {
      //   console.log("🚀 ~ file: app.tsx:63 ~ useEffect ~ e:", e);
      // });

      onMessage<{
        info: chrome.contextMenus.OnClickData;
        tab: chrome.tabs.Tab;
      }>(MessageType.SHOW_EMOJI_COLLECTION, (props) => {
        const activeDiv = document.activeElement.closest("[contenteditable]");
        console.log(
          "🚀 ~ file: app.tsx:56 ~ useEffect ~ activeDiv:",
          activeDiv
        );

        parseClipboardData(activeDiv);
      });

      console.log("content view loaded");
    } catch (error) {
      console.log("🚀 ~ file: app.tsx:60 ~ useEffect ~ error:", error);
    }
  }, []);

  return <div className="text-lime-400" />;
}
