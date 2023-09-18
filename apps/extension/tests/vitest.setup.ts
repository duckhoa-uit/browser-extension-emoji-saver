import { beforeAll, vi } from "vitest";
import mockBrowser from "sinon-chrome";
import chrome from "sinon-chrome/extensions";
import { mockLocalStorage } from "./helpers/mocks/storage";

// const chrome = require('sinon-chrome');
// window.chrome = chrome;
/**
 * sinon-chrome does declare a browser.runtime.id property, but its value is null, which caused the duck-typing to fail.
 *
 * @see https://github.com/mozilla/webextension-polyfill/issues/218#issuecomment-584936358
 */
chrome.runtime.id = "text";

// mock chrome webextension api
global.chrome = chrome;

// implements some global function for 'webextension-polyfill' before mocking
mockBrowser.runtime.getURL.callsFake(
  (url: string) => `chrome-extension://test/${url}`
);
mockBrowser.runtime.getManifest.returns({ version: "0.0.0" });

mockBrowser.i18n.getUILanguage.returns("en");
mockBrowser.i18n.getMessage.callsFake((value: string) => value);

mockBrowser.tabs.query.returns([]);

vi.mock("webextension-polyfill", () => mockBrowser);

// create browser.storage.local emulator and bound it with sinon-chrome stub
mockLocalStorage();
