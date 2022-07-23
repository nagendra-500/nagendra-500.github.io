import Notification from "../util/notification";
import Events from "./apps/events";
global.browser = require("webextension-polyfill");
global.auth = Authentication;
global.auth.getUser();
global.auth.registerForTabActive();

// Listen for Events
Events.listen();
// On every tab move  check auth
global.browser.tabs.onActivated.addListener((info) => {
  verifyAuth(info.tabId);
});

// On every onload check auth
global.browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  chrome.storage.sync.get(["appminds"], (result) => {
    if (!result["appminds"].logged)
      global.auth.getUser().then((response) => {
        if (response.hasOwnProperty("token")) return reloadBrowser();
      });
  });
});

// Verify auth process
const verifyAuth = (tabId) => {
  chrome.storage.sync.get(["appminds"], (result) => {
    if (!result["appminds"].logged) sendToCS(tabId, "logout");
    else sendToCS(tabId, "login", result["appminds"]);
  });
};

// Send user logged or not to content script
const sendToCS = (tabId, value, userInfo) => {
  chrome.tabs.sendMessage(tabId, { type: value, data: userInfo });
};


chrome.runtime.onInstalled.addListener(function (details) {
  // Enable the notification when user install the extension in browser
  Notification.send("AppMinds - To track the list of starred repos", "Thanks for installing AppMinds extension.", "icons/128.png", "AppMinds");
  reloadBrowser();
});

chrome.runtime.onSuspend.addListener(async function (details) {
  await chrome.tabs.query({ url: "https://mail.google.com/*" }, async function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      await chrome.tabs.sendMessage(tabs[i].id, { type: "check_auth" }, (response) => {});
    }
  });
});


