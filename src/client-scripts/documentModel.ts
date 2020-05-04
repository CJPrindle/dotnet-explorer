
import {HtmlAttribute} from '../models/htmlAttribute';

/**
 * @class 
 * @classdesc Provides access to the HTML Document Object Model
*/
export class DocumentModel {
  /**
   * @public
   * @function
   * @summary Creates a HTML element
   * @description Creates a HTML element and inserts it into the DOM under the specified parent
   * @param {string} name - The element type name
   * @param {string} parentID - the id attribute of the parent element
   * @param attributes - An array of element attributes
   * @param classNames - CSS class names
   * @param innerText - The text value of the element  
  */
  createHtmlElement (name: string, parentID: string, attributes: HtmlAttribute[],
    classNames: string, innerText: string): HTMLElement {
    
    //Create the new Html element
    const newElement = document.createElement(name)

    // Set the attributes
    if (attributes !== null) {
      attributes.forEach(attr => {
        newElement.setAttribute(attr.name, attr.value);
      })
    }

    // Set the class name
    if (classNames != null) {
      newElement.className = classNames
    }

    // Set innerText
    if (innerText !== null) {
      newElement.innerText = innerText
    }

    // Assign to parent element
    if (parentID !== null) {
      const parentEl = document.getElementById(parentID)
      parentEl.appendChild(newElement)
    }

    return newElement
  }
}