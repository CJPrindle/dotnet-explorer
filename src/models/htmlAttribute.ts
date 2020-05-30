/**
 * @class 
 * @classdesc Represents an HTML attribute object
*/
export class HtmlAttribute {
 
  /**
  * @summary Constructor
  * @description Constructor for the HtmlAttribute class
  * @param {string} name - The name of the attribute
  * @param {any} value - The value of the attribute
  */
  constructor(name: string, value: any) {
    this.Name = name
    this.Value = value
  }

  /**
  * @summary Name property
  * @description The HTML attribute name property
  * @type {string}
  * @member
  */
  Name: string
  /**
  * @summary Value property
  * @description The HTML attribute value property
  * @type {any}
  * @member
  */
  Value: any
}