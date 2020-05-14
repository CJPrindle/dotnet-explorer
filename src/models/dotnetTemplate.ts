/**
 * @class 
 * @classdesc A dotnet template item
*/
export class DotNetTemplate {
  /**
  * @summary Name property
  * @description The name of the dotnet template
  * @type {string}
  * @member
  */
  name: string

  /**
  * @summary Short name property
  * @description Value used when specifying a template to use
  * @type {string}
  * @member
  */
  shortName: string

  /**
  * @summary Languages property
  * @description Contains the CLR languages supported by the template
  * @type {string[]}
  * @member
  */
  languages: string[]

  /**
  * @summary Tags property
  * @description One or more descriptive values for the template
  * @type {string[]}
  * @member
  */
  tags: string[]

  /**
  * @summary Icon property
  * @description Default image for the template 
  * @type {string[]}
  * @member
  */
  icon: string
}