// if ("undefined" === typeof window) {
  // importScripts("https://pushly.s3.ap-south-1.amazonaws.com/lib/firebase-listener_new.js");
// }

// importScripts("https://cdn-push.500apps.com/lib/firebase-listener.js");

importScripts("https://www.gstatic.com/firebasejs/6.4.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.4.2/firebase-messaging.js");

/**
 * @class PushlyFirebaseListener
 */
class PushlyFirebaseListener {

  /**
   * @constructor
   */
  constructor() {
    // Store messageApi of current executed message when user clicks on the message
    this.exeMessageApi = '';
    
    // Store jwt token which has domainId, flowId, messageId 
    this.messageApi = '';
    
    // Fcm subscription object
    this.subscriptionObject = {};
    
    // Store event action url 
    this.url = '';
    
    // Store current domain url 
    this.launchUrl = '';
  }

  /**
   * Initialization method
   */
  init() {

    // To listen the messages pushed from service worker
    self.addEventListener('push', function (event) {
      var message = event.data.json();
      this.messageApi = message.data.message_api;
      this.subscriptionObject = message.data.subscription_object;
      this.launchUrl = message.data.launch_url;
      var region = message.data.region;
      var obj = JSON.parse(message.data.notification);
      const title = obj.title;
      const options = {
        body: obj.body,
        icon: obj.icon,
        data: {
          message_api: message.data.message_api,
          region:region
        },
      };
      if (message.data.action_button) {
        options["actions"] = JSON.parse(message.data.action_button);
      }

      event.waitUntil(self.registration.showNotification(title, options));
    });

    // To listen when user clicks on notification
    self.addEventListener('notificationclose', (event) => {
      const clickedNotification = event.notification;
      console.log('event.action',event.action);
      if (clickedNotification.data.message_api != this.exeMessageApi) {
        //saveUserAction("close");
        PushlyFirebaseListener.saveUserAction("close",clickedNotification.data.message_api,clickedNotification.data.region);

      }
    });

    // To listen when user closes notification
    self.addEventListener('notificationclick', function (event) {
      if (event.action) {
        PushlyFirebaseListener.url = event.action;
        clients.openWindow(event.action)
      } else {
        PushlyFirebaseListener.url = PushlyFirebaseListener.launchUrl;
        clients.openWindow(launch_url)
      }

      this.exeMessageApi = this.messageApi;
      const clickedNotification = event.notification;
      PushlyFirebaseListener.saveUserAction(((event.action) ? event.action : "executed"),clickedNotification.data.message_api,clickedNotification.data.region);
      
      // Reset variable
      this.exeMessageApi = '';

    });
  }

  /**
   * To make a network call and store messages in database
   */
  static saveUserAction(actionText,message_api,region) {
    const messagelog = {
      url: this.url,
      executionText: actionText,
      message_api: message_api,
      subscriptionObject: this.subscriptionObject
    }

    var messageLogUrl = 'https://custom.'+region+'.500apps.io/c/pushly/messagelog';

    fetch(messageLogUrl, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(messagelog),
    })
  }
}
(() => {
  var _pushlyFirebaseListener = new PushlyFirebaseListener()
  _pushlyFirebaseListener.init();
})();

