import DOM from './dom.js';

// eslint-disable-next-line no-use-before-define
var browser = browser || chrome;
class CSAppMinds {
  constructor() {
    this.checkUserAuth();
    // Add div so that we know that extension is loaded on the page
    this.addDiv();
    // Listens events from background scope
    this.handleEvent();
  }

  // Add parent class for extension
  addDiv() {
    DOM.addHTML(document.body, "<div id='appminds_extension'/>");
  }

  // Set extension ID
  setExtensionId() {
    if (typeof chrome.app.isInstalled !== 'undefined' || typeof chrome.app.isInstalled === 'boolean') {
      setTimeout(() => {
        chrome.runtime.sendMessage({ _minds: 'extension_id' }, function(response) {
          var elt = document.createElement('script');
          elt.innerHTML = 'window.appminds_extension="' + response + '"';
          elt.id = 'extension_minds';
          document.head.appendChild(elt);
        });
      }, 500);
    }
  }

  // Send the current timestamp to background
  event() {
    var domain = document.getElementById('domain').value;
    var timestamp = new Date();
    var host = new URL(domain).host;
    if (host.split('.').length >= 3) {
      var search = host.split('.');
      host = search.slice(1).join('.');
    }
    browser.runtime.sendMessage({ _minds: 'storage', data: timestamp, id: host }, function(response) {});
  }

  checkUserAuth() {
    chrome.storage.sync.get(['minds'], result => {
      const obj = result.minds;
      // eslint-disable-next-line no-useless-return
      if (!obj.logged) return;
      else {
        window._minds_auth = true;
        window._minds_tenant_id = obj.value.info.tenant_id;
        window._minds_user_id = obj.value.info.user_id;
        window._minds_token = obj.value.token;
      }
    });
  }

  // To get response when user login on DOM
  handleEvent() {
    browser.runtime.onMessage.addListener(request => {
      if (request.type === 'login' && document.querySelector('#apps500_login') != null) {
        document.querySelector('#apps500_login').remove();
        this.sendResponse(window.rules, this.parseData);
      }
      if (request.type === 'login') window._minds_auth = true;
      else window._minds_auth = false;
    });
  }
}

// Create instance  - also, script was loaded twice
chrome.storage.sync.get(['minds'], result => {
  const obj = result.minds;
  // eslint-disable-next-line no-useless-return
  if (!obj.logged) return;
  else {
    window._minds_tenant_id = obj.value.info.tenant_id;
    window._minds_user_id = obj.value.info.user_id;
  }
});
if (!global.CSAppMinds) global.CSAppMinds = new CSAppMinds();
