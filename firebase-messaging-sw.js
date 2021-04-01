// importScripts("https://pushly.s3.ap-south-1.amazonaws.com/lib/listenerly.min.js");


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
  
      //Store push object
      this.pushObj = "";
    }
  
    /**
     * Initialization method
     */
    init() {
      // To listen the messages pushed from service worker
      self.addEventListener("push", function (event) {
        var message = event.data.json();
        console.log("Push message", message);
        if (message.data.hasOwnProperty("data")) {
            this.pushObj = JSON.parse(message.data.data);
          var obj = JSON.parse(message.data.notification);
          localStorage.setItem("response", this.pushObj);
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
        this.saveUserAction("close");
      });
  
      // To listen when user closes notification
      self.addEventListener("notificationclick", function (event) {
        if (event.action) {
          PushlyFirebaseListener.url = event.action;
          clients.openWindow(event.action);
        } else {
          PushlyFirebaseListener.url = PushlyFirebaseListener.launchUrl;
          clients.openWindow(this.launchUrl);
        }
  
        this.exeMessageApi = this.messageApi;
        const clickedNotification = event.notification;
        console.log("PushlyFirebaseListener", PushlyFirebaseListener);
        // PushlyFirebaseListener.saveUserAction(event.action ? event.action : "executed");
  
        // Reset variable
        this.exeMessageApi = "";
      });
    }
  
    /**
     * To make a network call and store messages in database
     */
    saveUserAction(actionText) {
      console.log("jfhsdjkhfjkdh",this.pushObj);
      var result = localStorage.getItem("response");
      result.action = actionText;
      var messagelog = this.pushObj;
      console.log("respose", messagelog);
      fetch(`https://my.dev.500apps.com/pcors?url=https://push.dev.500apps.com/push/v1/message/log?app_name=push`, {
        method: "post",
        headers: {
          Accept: "application/json",
        //   "x-api-key": window._push.apiKey,
        },
        body: JSON.stringify(messagelog),
      });
    }
  }
  (() => {
    var _pushlyFirebaseListener = new PushlyFirebaseListener();
    _pushlyFirebaseListener.init();
  })();
  




   

