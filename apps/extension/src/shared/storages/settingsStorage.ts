import {
  BaseStorage,
  createStorage,
  StorageType,
} from "@src/shared/storages/base";

export type Settings = {
  showPopupOnDoubleClick: boolean;
  showInContextMenu: boolean;
};

type ThemeStorage = BaseStorage<Settings> & {
  add?: () => void;
};

const settings = createStorage<Settings>(
  "settings-storage-key",
  {
    showPopupOnDoubleClick: true,
    showInContextMenu: true,
  },
  {
    storageType: StorageType.Local,
  }
);

const settingsStorage: ThemeStorage = {
  ...settings,
};

export default settingsStorage;
