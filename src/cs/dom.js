class DomMinds {
  // Add HTML to element
  addHTML(element, html) {
    var child = document.createElement('div');
    child.innerHTML = html;
    child = child.firstChild;
    // Add HTML in the element itself
    element.insertAdjacentHTML('beforeend', html);
    chrome.storage.local.remove(['domain']);

    return element.lastChild;
  }

  // Get element by ID
  getElemId(value) {
    return document.querySelector('#' + value);
  }

  // Add click listeners to custom element
  addListener(type, id, cb) {
    this.getElemId(id).addEventListener(type, cb);
  }

  // Add CSS
  addCSS(css) {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {
      // IE
      s.styleSheet.cssText = css;
    } else {
      // The world
      s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
  }

  // Add HTML to body
  addHTMLToBody(html) {
    const element = document.getElementsByTagName('body')[0];
    return this.addHTML(element, html);
  }

  // Add HTML to ID.
  addHTMLToID(id, html) {
    const element = document.getElementById(id);
    return this.addHTML(element, html);
  }

  /**
   * To get HTML based on ID
   * @param {String} ID  DOM ID
   */
  getHTMLByID(ID) {
    return document.getElementById(ID);
  }

  /**
   * To get HTML based on class name
   * @param {String} className  DOM class name
   */
  getHTMLByClassName(className) {
    return document.getElementsByClassName(className);
  }
}

// Export DOM class
export default new DomMinds();
