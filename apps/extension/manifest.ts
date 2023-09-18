import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Emoji Kitchen Saver",
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["storage"],
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-32.png",
  },
  // chrome_url_overrides: {
  //   newtab: "src/pages/newtab/index.html",
  // },
  icons: {
    "16": "icon-16.png",
    "32": "icon-32.png",
    "192": "icon-192.png",
    "512": "icon-512.png",
  },
  content_scripts: [
    {
      matches: ["*://*.google.com/*"],
      js: ["src/pages/content/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-16.png",
        "icon-32.png",
        "icon-192.png",
        "icon-512.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
