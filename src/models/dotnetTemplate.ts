/**
 * @class 
 * @classdesc A dotnet template item
*/
export class DotNetTemplate {
   /**
  * @summary Icon property
  * @description Default image for the template 
  * @type {string[]}
  * @member
  */
  icon: string

    /**
  * @summary Languages property
  * @description Contains the CLR languages supported by the template
  * @type {string[]}
  * @member
  */
  languages: string[]

  /**
  * @summary Name property
  * @description The name of the dotnet template
  * @type {string}
  * @member
  */
  name: string

  /**
  * @summary Short name property
  * @description An alternate name used on the command line when creating a new project
  * @type {string}
  * @member
  */
  shortName: string

  /**
  * @summary Tags property
  * @description One or more descriptive words for a template
  * @type {string[]}
  * @member
  */
  tags: string[]
}