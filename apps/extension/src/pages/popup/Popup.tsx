import supportEmojis from "@assets/supported_emojis.json";
import "@pages/popup/Popup.css";
import { CopyButton } from "@root/src/components/copy-button";
import EmptyBox from "@root/src/components/empty-box";
import savedEmojisStorage, {
  MixedEmoji,
} from "@root/src/shared/storages/savedEmojiStorage";
import { copyImageToClipboard } from "@root/utils/clipboard";
import withSuspense from "@src/shared/hoc/withSuspense";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";

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
    // const ref = useRef<HTMLButtonElement>();
    const finalURL = getEmojisUrl(emojis[0], emojis[1]);
    if (!finalURL) return null;

    return (
      <div
        className="relative p-2 flex flex-col items-center gap-2 "
        onClick={() => {
          copyImageToClipboard(finalURL);
        }}
      >
        <button
          onClick={() => savedEmojisStorage.remove(emojis)}
          className="scale-50 font-medium text-slate-400 absolute -top-1 -right-1 hover:text-red-500 transition-all"
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
        <CopyButton />
      </div>
    );
  };

  return (
    <div className="App">
      <main className="pt-2 h-full">
        <div className="h-8">
          <a
            className="text-slate-100 font-semibold text-2xl cursor-pointer"
            href="https://duckhoa.dev"
            target="_blank"
            rel="noreferrer"
          >
            Emoji Saver
          </a>
        </div>

        {savedEmojis.length > 0 ? (
          <div className="grid grid-cols-5 mx-auto mt-3 h-[300px] overflow-y-auto">
            {savedEmojis.map(renderMixedEmojisImg)}
          </div>
        ) : (
          <div className="w-full h-[300px] flex flex-col items-center justify-center">
            <div className="text-slate-400">
              <EmptyBox />
            </div>
            <p className="text-slate-300 mt-2 text-md">
              Có vẻ bạn chưa lưu emoji nào
            </p>
            <a
              className="text-slate-300 text-md hover:underline font-medium flex flex-row items-center"
              href="https://www.google.com/search?q=emoji+kitchen"
              target="_blank"
              rel="noreferrer"
            >
              Go go mix emoji thuiiiiii
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bdc1c6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="scale-75"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        )}

        <div className="w-full h-12 flex flex-col justify-center">
          <div className="flex flex-row items-center gap-3 w-full justify-center">
            <a
              className="text-slate-300 font-medium hover:underline"
              href="https://twitter.com/duckhoa_dev"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <a
              className="text-slate-300 font-medium hover:underline"
              href="https://github.com/duckhoa-uit/browser-extension-emoji-saver"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withSuspense(Popup);
