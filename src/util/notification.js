class Notification {
  // Send desktop notification to user
  send(title, message, image, id) {
    const data = {
      type: 'basic',
      title: title,
      message: message,
      iconUrl: browser.extension.getURL(image),
    };
    global.browser.notifications.create(id, data);
  }

  // Clear the notification by respective ID
  clear(id) {
    global.browser.notifications.clear(id);
  }
}

// Export Notification class
export default new Notification();
