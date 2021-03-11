if ("undefined" === typeof window) {
  importScripts("https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js");
  importScripts("https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js");
}

/**
 * @class PushlyFirebaseListener
 */
class PushlyFirebaseListener {
  /**
   * @constructor
   */
  constructor() {
    // _500Client.rest.setServerURL(`${window._pushGlobal.serverUrl}`);

    // Store messageApi of current executed message when user clicks on the message
    this.exeMessageApi = "";

    // Store jwt token which has domainId, flowId, messageId
    this.messageApi = "";

    // Fcm subscription object
    this.subscriptionObject = {};

    // Store event action url
    this.url = "";

    // Store current domain url
    this.launchUrl = "";
  }

  /**
   * Initialization method
   */
  init() {
    // To listen the messages pushed from service worker
    self.addEventListener("push", function (event) {
      var message = event.data.json();
      this.messageApi = message.data.message_api;
      this.subscriptionObject = message.data.subscription_object;
      this.launchUrl = message.data.launch_url;
      var obj = JSON.parse(message.data.notification);
      const title = obj.title;
      const options = {
        body: obj.body,
        icon: obj.icon,
      };
      if (message.data.action_button) {
        options["actions"] = JSON.parse(message.data.action_button);
      }

      event.waitUntil(self.registration.showNotification(title, options));
    });

    // To listen when user clicks on notification
    self.addEventListener("notificationclose", (event) => {
      const clickedNotification = event.notification;
      if (this.messageApi != this.exeMessageApi) {
        saveUserAction("close");
      }
    });

    // To listen when user closes notification
    self.addEventListener("notificationclick", function (event) {
      if (event.action) {
        PushlyFirebaseListener.url = event.action;
        clients.openWindow(event.action);
      } else {
        PushlyFirebaseListener.url = PushlyFirebaseListener.launchUrl;
        clients.openWindow(launch_url);
      }

      this.exeMessageApi = this.messageApi;
      const clickedNotification = event.notification;
      console.log('PushlyFirebaseListener',PushlyFirebaseListener);
      PushlyFirebaseListener.saveUserAction(event.action ? event.action : "executed");

      // Reset variable
      this.exeMessageApi = "";
    });
  }

  /**
   * To make a network call and store messages in database
   */
  static saveUserAction(actionText) {
    const messagelog = {
      url: this.url,
      executionText: actionText,
      message_api: this.messageApi,
      subscriptionObject: this.subscriptionObject,
    };

    fetch("https://custom.dev.500apps.io/c/pushly/messagelog", {
      method: "post",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(messagelog),
    });
  }
}
(() => {
  var _pushlyFirebaseListener = new PushlyFirebaseListener();
  _pushlyFirebaseListener.init();
})();
