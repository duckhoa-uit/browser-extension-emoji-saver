// Extension's context menu

import { MessageType } from "@root/src/extension/messages";
import {
  sendMessage,
  getManifest,
  onMessage,
} from "@root/src/extension/runtime";
import { getActiveTab, sendMessageToTab } from "@root/src/extension/tabs";
import settingsStorage from "@root/src/shared/storages/settingsStorage";

// import { settingsStorage } from "../components/settings/settings.storage";
// import { getTranslator, getTranslators } from "../vendors";
// import { getMessage, i18nInit } from "../i18n";

export async function initContextMenus() {
  // await settingsStorage.load();
  // await i18nInit();

  // return autorun(refreshContextMenus);
  await refreshContextMenus();
}

export async function refreshContextMenus() {
  type ContextType = chrome.contextMenus.ContextType;

  const { showInContextMenu } = await settingsStorage.get();
  const appName = getManifest().name;
  const selectionContext: ContextType[] = ["selection"];
  const pageContext: ContextType[] = [...selectionContext, "page"];
  // const translators = getTranslators();

  chrome.contextMenus.removeAll(); // clean up before reassign
  chrome.contextMenus.onClicked.addListener(onClickMenuItem);
  if (!showInContextMenu) return; // skip re-creating

  // chrome.contextMenus.create({
  //   id: appName,
  //   title: appName,
  //   contexts: pageContext,
  // });

  chrome.contextMenus.create(
    {
      id: "Open Emoji Collection",
      title: "Open Emoji Collection",
      contexts: ["editable"],
    },
    createContextMenuErrorHandler
  );
}

// Handle menu clicks from web content pages
async function onClickMenuItem(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab
) {
  console.log(
    "🚀 ~ file: context-menu.ts:116 ~ chrome.contextMenus.onClicked.addListener ~ info, _tab:",
    info,
    tab
  );
  const activeTab = await getActiveTab();

  try {
    await sendMessage({
      type: MessageType.SHOW_EMOJI_COLLECTION,
      tabId: activeTab.id,
      payload: { info, tab },
    });
  } catch (error) {
    console.error(
      "🚀 ~ file: context-menu.ts:133 ~ chrome.contextMenus.onClicked.addListener ~ error:",
      error
    );
  }
}

export function createContextMenuErrorHandler(): void {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
  }
}
