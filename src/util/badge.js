class Badge {
  // Show badgea on browser icon
  set(text) {
    global.browser.browserAction.setBadgeText({ text: text });
  }
}
// Export Badge class
export default new Badge();
