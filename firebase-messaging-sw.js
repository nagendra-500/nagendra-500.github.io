// importScripts("https://infinity-public-js.500apps.com/push/listener.min.js");

// importScripts("https://pushly.s3.ap-south-1.amazonaws.com/lib/listenertest.min.js");

if ("undefined" === typeof window) {
  importScripts("https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js"
  );
}

/**
 * @class PushlyFirebaseListener
 */
class PushlyFirebaseListener {
  /**
   * @constructor
   */
  constructor() {
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

    // Store push object
    this.pushObj = "";

    // Store Message Id
    this.message_id = "";

    // Check event
    this.execute = false;
  }

  /**
   * Initialization method
   */
  init() {
    // To listen the messages pushed from service worker
    self.addEventListener("push", (event) => {
      this.execute = false;
      var message = event.data.json();
      console.log("message", message);
      if (message.data.hasOwnProperty("data")) {
        this.pushObj = JSON.parse(message.data.data);
        this.message_id = this.pushObj.message_id;
        this.launchUrl = this.pushObj.launch_url;
        var obj = JSON.parse(message.data.notification);
      } else if (!message.data.hasOwnProperty("data")) {
        var obj = JSON.parse(message.data.notification);
      }
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
      console.log("notificationclose", event);
      const clickedNotification = event.notification;
      if (this.message_id && !this.execute) this.saveUserAction("close");
    });

    // To listen when user closes notification
    self.addEventListener("notificationclick", (event) => {
      this.execute = true;
      console.log("notificationclick", event);
      if (event.action) {
        PushlyFirebaseListener.url = event.action;
        clients.openWindow(event.action);
      } else {
        console.log("LANCH URL", this.launchUrl);
        PushlyFirebaseListener.url = PushlyFirebaseListener.launchUrl;
        console.log("LANCH URL", PushlyFirebaseListener.url);
        clients.openWindow(this.launchUrl);
      }

      this.exeMessageApi = this.messageApi;
      const clickedNotification = event.notification;
      if (this.message_id)
        this.saveUserAction(event.action ? event.action : "executed");
      // Reset variable
      this.exeMessageApi = "";
    });
  }

  /**
   * To make a network call and store messages in database
   */
  saveUserAction(actionText) {
    this.pushObj.action = actionText;
    var messagelog = this.pushObj;
    fetch(
      `https://my.${this.pushObj.region}.500apps.com/pcors?url=https://push.${this.pushObj.region}.500apps.com/push/v1/message/log?app_name=push`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": this.pushObj.api_key,
        },
        body: JSON.stringify(messagelog),
      }
    );
  }
}
(() => {
  var _pushlyFirebaseListener = new PushlyFirebaseListener();
  _pushlyFirebaseListener.init();
})();
