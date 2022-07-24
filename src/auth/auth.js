import Cookie from './cookie';
class Authentication {
  registerForCookieChange() {
    // Add listener
    global.browser.cookies.onChanged.addListener(function(changeInfo) {
      // eslint-disable-next-line no-useless-return
      if (changeInfo.cookie.domain !== '.appminds.com') return;
    });
  }

  // Get User
  getUser() {
    return new Promise((resolve, reject) => {
      Cookie.getCookie(global.domain, global.token)
        .then(cookie => {
          // Check if user is logged in
          if (!cookie || cookie.length === 0) {
            this.storeData({ logged: false });
            reject(new Error('User is not logged in.'));
            return;
          }
          var jwtDecode = require('jwt-decode');
          const decoded = jwtDecode(cookie[0].value);
          this.storeData({
            logged: true,
            value: { info: decoded, token: cookie[0].value },
          });
          resolve({ user: decoded, token: cookie[0] });
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  }

  getTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        resolve({ tab: tabs });
      });
    });
  }

  // Set the storage for used details
  storeData(data) {
    chrome.storage.sync.set({ appminds: data });
  }

  // Register with respective website by user
  registerForTabActive() {
    global.browser.tabs.onActivated.addListener(info => {
      this.getUser()
        .then(data => {
          chrome.tabs.sendMessage(info.tabId, { type: 'login' });
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          chrome.tabs.sendMessage(info.tabId, { type: 'logout' });
        });
    });
  }
}

// Export Authentication class
export default new Authentication();
