import {
  BaseStorage,
  createStorage,
  StorageType,
} from "@src/shared/storages/base";

export type MixedEmoji = [string, string];

export type SavedEmojis = MixedEmoji[];

type ThemeStorage = BaseStorage<SavedEmojis> & {
  add: (emoji: MixedEmoji) => void;
  remove: (emoji: MixedEmoji) => void;
};

const storage = createStorage<SavedEmojis>("saved-emojis-storage-key", [], {
  storageType: StorageType.Local,
});

const savedEmojisStorage: ThemeStorage = {
  ...storage,
  // TODO: extends your own methods
  add: (emojis) => {
    storage.set((currentList) => {
      const emojisExists =
        currentList.findIndex(
          (item) => item.includes(emojis[0]) && item.includes(emojis[1])
        ) >= 0;
      console.log("🚀 checking:", currentList, emojis, emojisExists);
      if (emojisExists) return currentList;

      console.log("🚀 saved:", emojis);

      return [emojis, ...currentList];
    });
  },
  remove: (emojis) => {
    storage.set((currentList) => {
      const newList = currentList.filter(
        (item) => !(item.includes(emojis[0]) && item.includes(emojis[1]))
      );
      return newList;
    });
  },
};

export default savedEmojisStorage;
