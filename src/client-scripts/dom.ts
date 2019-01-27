
export class domElements {
  createHtmlElement(name, parentElement, attributes, innerText): HTMLElement {
    //Create the new Html element
    const newElement = document.createElement(name)

    // Set the attributes
    if (attributes !== null) {
      attributes.forEach(attr => {
        newElement.setAttribute(attr.name, attr.value);
      })
    }

    // Set innerText
    if (innerText !== null) {
      newElement.innerText = innerText
    }

    // Assign to parent element
    if (parentElement !== null) {
      const parentEl = document.getElementById(parentElement)
      parentEl.appendChild(newElement)
    }

    return newElement
  }
}