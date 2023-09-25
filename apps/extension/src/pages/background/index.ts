import { onInstall, openOptionsPage } from "@root/src/extension/runtime";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { initContextMenus } from "./context-menu";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

onInstall((reason) => {
  if (reason === "install") {
    openOptionsPage();
  }
});

initContextMenus()
  .then(() => console.log("background loaded"))
  .catch(console.error);
