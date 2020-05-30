/**
 * @class 
 * @classdesc A dotnet template item
*/
export class Template {
  /**
  * @summary Icon property
  * @description Default image for the template 
  * @type {string[]}
  * @member
  */
  Icon: string

  /**
  * @summary IsFavorite property
  * @description Determines if a template is marked as a favorite
  * @type {boolean}
  * @member
  */
  IsFavorite: boolean

  /**
  * @summary Languages property
  * @description Contains the CLR languages supported by the template
  * @type {string[]}
  * @member
  */
  Languages: string[]

  /**
  * @summary Name property
  * @description The name of the dotnet template
  * @type {string}
  * @member
  */
  Name: string

  /**
  * @summary Short name property
  * @description An alternate name used on the command line when creating a new project
  * @type {string}
  * @member
  */
  ShortName: string

  /**
  * @summary Tags property
  * @description One or more descriptive words for a template
  * @type {string[]}
  * @member
  */
  Tags: string[]
}