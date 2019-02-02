
import {HtmlAttribute} from '../models/html-attribute';

export class DomElements {
  createHtmlElement(
    name: string,
    parentID: string,
    attributes: HtmlAttribute[],
    classNames: string,
    innerText: string): HTMLElement {

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