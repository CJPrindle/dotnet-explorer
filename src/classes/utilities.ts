import * as fs from 'fs'
import * as path from 'path'
import { Template } from '../models/Template'
import { HtmlAttribute } from '../models/HtmlAttribute'
import { DocumentModel } from '../client-scripts/DocumentModel'
import { SettingsUtil } from './SettingsUtil'

export class Utilities {
  public static CurrentTemplates : Template[]
  public static CurrentTemplate : Template

  public static GetTemplateIcon(tags: string[]): string {
    let templateImagesPath = path.join(__dirname, '../assets/templates')
    let templateImage = ''

    // Start with the most specific tag and work towards the more common
    try {
      for (let x = tags.length - 1; x >= 0; x--) {
        templateImage = path.join(templateImagesPath, `${tags[x].toLowerCase()}.png`)

        if (fs.existsSync(templateImage)) {
          return templateImage
        }
      }
    } catch (e) {}

    return 'assets/templates/default.png'
  }

  public static LoadSidebarTemplates(dotNetTemplates: Template[], setCurrentTemplates: boolean = true) {
    const dom = new DocumentModel()  
    const sidebarItems = <HTMLUListElement>document.getElementById('sidebarItems')  
    let htmlAttributes: HtmlAttribute[] = []
    let sidebarItem: HTMLElement

    if(setCurrentTemplates) {
      Utilities.CurrentTemplates = dotNetTemplates      
    }
    
    // Add a tabIndex attribute to allow the LI to receive focus
    htmlAttributes.push(new HtmlAttribute('tabIndex', 0))
    
    // Clear list
    sidebarItems.innerHTML = ''
        
    dotNetTemplates.forEach(dotnetTemplate => {
      let css = dotnetTemplate.IsFavorite 
                  ? 'list-group-header favorite-list-item' 
                  : 'list-group-header' 

      sidebarItem = dom.CreateHtmlElement('li', 'sidebarItems', htmlAttributes, css, dotnetTemplate.Name)
  
      // Capture the LI click event
      sidebarItem.addEventListener('click', (ev: Event) => {
        // Set focus on the selected LI
        (<HTMLLIElement>ev.target).focus()
  
        Utilities.CurrentTemplate = dotnetTemplate
  
        // Determine if favorite template
        const favoriteTemplate = <HTMLInputElement>document.getElementById('favoriteTemplate')
        favoriteTemplate.checked = SettingsUtil.IsFavoriteTemplate(Utilities.CurrentTemplate)
        
        // Set languages drop down
        const projectLanguages = <HTMLSelectElement>document.getElementById('projectLanguages')
        projectLanguages.innerHTML = ''
  
        dotnetTemplate.Languages.forEach(language => {
          dom.CreateHtmlElement('option', 'projectLanguages', null, '', language)
        })
        
        // Set title elements
        const templateTitleIcon = <HTMLImageElement>document.getElementById('templateTitleIcon')
        templateTitleIcon.src = dotnetTemplate.Icon
        const templateTitleName = <HTMLDivElement>document.getElementById('templateTitleName')
        templateTitleName.innerText = dotnetTemplate.Name
        const templateTitleShortName = <HTMLDivElement>document.getElementById('templateTitleShortName')
        templateTitleShortName.innerText = dotnetTemplate.ShortName
        const templateChips = <HTMLSpanElement>document.getElementById('templateChips')
        templateChips.innerHTML = ''
        const projectLegend = <HTMLLegendElement>document.getElementById('projectLegend')
        projectLegend.innerText = `New Project From: ${dotnetTemplate.Name}`
  
        // Create chips for each language the template supports
        dotnetTemplate.Languages.forEach(language => {
          dom.CreateHtmlElement('span', 'templateChips', null, 'chip', language)
        })
  
        // Create chips for each tag assigned to the template
        dotnetTemplate.Tags.forEach(tag => {
          dom.CreateHtmlElement('span', 'templateChips', null, 'chip', tag)
        })
      })
    })
  }
}
