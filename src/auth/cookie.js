class Cookie {
  // Read cookies of given global host & token
  getCookie(domain, key) {
    return global.browser.cookies.getAll({ domain: domain, name: key });
  }
}
// Export Cookie class
export default new Cookie();
