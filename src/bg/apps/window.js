class ChromeWindow {
  /**
   * Open new window
   * @param {*} url - Url
   */
  openNewWindow(url) {
    return new Promise((resolve, reject) => {
      chrome.windows.create({ url: url, state: 'maximized' }, window => {
        resolve(window.tabs[0]);
      });
    });
  }

  /**
   * Open new tab with url
   * @param {*} url
   */
  openTab(url) {
    return new Promise((resolve, reject) => {
      chrome.tabs.create({ url: url }, tab => {
        resolve(tab);
      });
    });
  }

  /**
   * Open new window
   */
  openWindow() {
    return new Promise((resolve, reject) => {
      chrome.windows.create(window => {
        resolve(window.tabs[0]);
      });
    });
  }

  /**
   * Check the tab is loaded.
   * @param {*} tab
   * @param {*} url
   */
  updateTab(tab, url) {
    return new Promise((resolve, reject) => {
      chrome.tabs.update(tab.id, { url: url }, function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            resolve(tab);
          }
        });
      });
    });
  }

  /**
   * Execute js code in tab .
   * @param {*} tab
   * @param {*} code
   */
  execScript(tab, code) {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(tab.id, { code: code, runAt: 'document_end' }, function(data) {
        resolve(data);
      });
    });
  }

  /**
   *  Get active tab
   */
  getActiveTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        resolve(tabs[0]);
      });
    });
  }
}

// Export ChromeWindow class
export default new ChromeWindow();
