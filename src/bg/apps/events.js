/* eslint-disable no-fallthrough */
import axios from 'axios';
import Authentication from '../../auth/auth';
import Notification from '../../util/notification';
import window from './window';

class Events {
  listen() {
    global.browser.runtime.onMessage.addListener(this.eventHandler.bind(this));
    global.browser.runtime.onMessageExternal.addListener(this.eventHandler.bind(this));
  }

  eventHandler(request, sender, sendResponse) {
    // If not message from minds, ignore
    // eslint-disable-next-line no-prototype-builtins
    if (!request.hasOwnProperty('_minds')) return;
    switch (request._minds) {
      case 'ajax':
        return Promise.resolve(this.ajax(request));
      case 'axios':
        return axios(request.request);
      case 'extension_id':
        return Promise.resolve(chrome.runtime.id);
      case 'token':
        return Authentication.getUser();
      case 'clear':
        Notification.clear(request.id);
        break;
      case 'notify':
        Notification.clear(request.id);
        Notification.send(request.appName, request.title, request.notifyImage, request.id);
        break;
      case 'storage':
        this.setStorage(request.data, request.id);
        break;
      case 'dash':
        window.openTab(request.url);
        break;
    }

    return new Promise(resolve => {});
  }

  // Set local storage
  setStorage(obj, host) {
    chrome.storage.local.set({ ['Last crawled-' + host]: obj }, () => {});
  }

  // CORS disabled hack - NinjaSEO
  ajax(request) {
    const instance = axios.create();

    instance.interceptors.request.use(config => {
      config.headers['request-startTime'] = new Date().getTime();
      return config;
    });

    instance.interceptors.response.use(response => {
      const start = response.config.headers['request-startTime'];
      const end = new Date().getTime();
      const milliseconds = end - start;
      response.headers['request-duration'] = milliseconds;
      return response;
    });

    return instance.get(request.url, {
      maxRedirects: 0,
    });
  }
}

// Export Events class
export default new Events();
