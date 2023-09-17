import React from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import savedEmojisStorage, {
  MixedEmoji,
  SavedEmojis,
} from "@root/src/shared/storages/savedEmojiStorage";
import supportEmojis from "@assets/supported_emojis.json";
import { CopyButton } from "@root/src/components/copy-button";
import { copyImageToClipboard } from "@root/utils/clipboard";

const getEmojiDate = (emoji: string) => {
  const foundEmoji = supportEmojis.find((_) => _.emojiUnicode === emoji);
  if (!foundEmoji) return null;

  return foundEmoji.date;
};

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const savedEmojis = useStorage(savedEmojisStorage);
  const API = "https://www.gstatic.com/android/keyboard/emojikitchen/";

  const getEmojisUrl = (emoji1: string, emoji2: string, date?: string) => {
    const _date = date ?? getEmojiDate(emoji1);
    if (!_date) return null;

    const combination = "/" + emoji1 + "/" + emoji1 + "_" + emoji2 + ".png";
    const finalURL = API + _date + combination;

    return finalURL;
  };

  const renderMixedEmojisImg = (emojis: MixedEmoji) => {
    const finalURL = getEmojisUrl(emojis[0], emojis[1]);
    if (!finalURL) return null;

    return (
      <div className="relative p-2 flex flex-col items-center gap-2 hover:bg-[#303134] cursor-pointer rounded-lg">
        <button
          onClick={() => {
            savedEmojisStorage.remove(emojis);
          }}
          className="scale-50 text-slate-400 absolute -top-1 -right-1 hover:text-red-500 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <img
          key={`${emojis[0]}_${emojis[1]}`}
          src={finalURL}
          className="w-6 h-6"
        />
        <CopyButton onClick={() => copyImageToClipboard(finalURL)} />
      </div>
    );
  };

  return (
    <div className="App">
      <main className="">
        <div className="grid grid-cols-5 mx-auto">
          {savedEmojis.map((emojis) => renderMixedEmojisImg(emojis))}
        </div>
      </main>
    </div>
  );
};

export default withSuspense(Popup);
