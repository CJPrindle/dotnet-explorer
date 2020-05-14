import { ipcRenderer } from 'electron'
import { DocumentModel } from './documentModel'
import { HtmlAttribute } from '../models/htmlAttribute'
import { DotNetTemplate } from '../models/dotnetTemplate'

let templateTags: string[] = []
let templateLanguages: string[] = []

window.addEventListener('DOMContentLoaded', _ => {
  document.getElementById('projectAddToFavorites').addEventListener('click', (ev) => {
    ipcRenderer.send('open-vs-code')
  })

  ipcRenderer.send('new-project-load')
})

// Returns unique values from array
function uniqueElements(value, index, self) {
  return self.indexOf(value) === index
}

// Called after the template list from the dotnet CLI has been parsed.
// Creates LI elements for each template and adds them to the main list
ipcRenderer.on('dotnet-projects-loaded', (_: any, jsonData: string) => {
  const dom = new DocumentModel()
  const dotNetTemplates: DotNetTemplate[] = JSON.parse(jsonData)
  let htmlAttributes: HtmlAttribute[] = []
  let projectItem: HTMLElement

  // Add a tabIndex attribute to allow the LI to receive focus
  htmlAttributes.push(new HtmlAttribute('tabIndex', 0))
  
  // Create LI elements for each template
  dotNetTemplates.forEach(dotnetTemplate => {
    projectItem = dom.createHtmlElement(
      'li',
      'projectList',
      htmlAttributes,
      'list-group-header',
      dotnetTemplate.name
    )

    // Capture the LI click event
    projectItem.addEventListener('click', (ev: Event) => {
      
      // Set focus on the selected LI
      (<HTMLLIElement>ev.target).focus()

      // Set title elements
      const templateTitleIcon = <HTMLImageElement>document.getElementById('templateTitleIcon')
      templateTitleIcon.src = `./assets/templates/${dotnetTemplate.icon}.png`
      const templateTitleName = <HTMLDivElement>document.getElementById('templateTitleName')
      templateTitleName.innerText = dotnetTemplate.name
      const templateTitleShortName = <HTMLDivElement>document.getElementById('templateTitleShortName')
      templateTitleShortName.innerText = dotnetTemplate.shortName
      const templateTitleChipContainer = <HTMLSpanElement>document.getElementById('templateTitleChipContainer')
      templateTitleChipContainer.innerHTML = ''
      const projectLegend = <HTMLLegendElement>document.getElementById('projectLegend')
      projectLegend.innerText = `Create Project Using Template: ${dotnetTemplate.name}`

      // Create chips for each language the template supports
      dotnetTemplate.languages.forEach(language => {
        dom.createHtmlElement(
          'span',
          'templateTitleChipContainer',
          null,
          'chip',
          language)
      })

      // Create chips for each tag assigned to the template
      dotnetTemplate.tags.forEach(tag => {
        dom.createHtmlElement(
          'span',
          'templateTitleChipContainer',
          null,
          'chip',
          tag)
      })
    })
  })
})

ipcRenderer.on('dotnet-templates-loaded', (_: any, templateData: string[][]) => {
  console.log(templateData)
  templateTags = templateData[0].filter(uniqueElements)
  templateLanguages = templateData[1].filter(uniqueElements)
  console.log(templateTags)
  console.log(templateLanguages)
})
