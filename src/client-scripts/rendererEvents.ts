import { ipcRenderer } from 'electron'
import { DocumentModel } from './documentModel'
import { HtmlAttribute } from '../models/htmlAttribute'
import { DotNetTemplate } from '../models/dotnetTemplate'
import { HtmlNamedColors } from '../client-scripts/htmlNamedColors'

const dom = new DocumentModel()
let templateTags: string[] = []
let templateLanguages: string[] = []

window.addEventListener('DOMContentLoaded', _ => {
  document.getElementById('projectAddToFavorites').addEventListener('click', (ev) => {
    ipcRenderer.send('open-vs-code')
  })

  const consoleThemes = <HTMLSelectElement>document.getElementById('consoleThemes')
  const outputConsole = <HTMLDivElement>document.getElementById('console')
  consoleThemes.addEventListener('change', (ev) => {

    switch(consoleThemes.value) {
      case "grass":
        outputConsole.style.backgroundColor = "DarkGreen"
        outputConsole.style.color = "AntiqueWhite"
        break
      case "manpages":
        outputConsole.style.backgroundColor = "PaleGoldenRod"
        outputConsole.style.color = "black"
        break
      case "novel":
        outputConsole.style.backgroundColor = "NavajoWhite"
        outputConsole.style.color = "brown"
        break
      case "redsands":
          outputConsole.style.backgroundColor = "DarkRed"
          outputConsole.style.color = "LemonChiffon"
          break  
      
      default:
        outputConsole.style.backgroundColor = ""
        outputConsole.style.color = ""
    }
    //ipcRenderer.send('console-theme-change', <HTMLSelectElement>ev.srcElement)
  })

  ipcRenderer.send('new-project-load')
})

// Returns unique values from array
function uniqueElements(value: any, index: any, self: string | any[]) {
  return self.indexOf(value) === index
}


ipcRenderer.on('dotnetCLI-data-output', (_: any, data: string) => {
  const consoleOutput = <HTMLPreElement>document.getElementById('consoleOutput')
  consoleOutput.innerText = data
})

// Called after the template list from the dotnet CLI has been parsed.
// Creates LI elements for each template and adds them to the main list
ipcRenderer.on('dotnet-projects-loaded', (_: any, jsonData: string) => {
  const dotNetTemplates: DotNetTemplate[] = JSON.parse(jsonData)
  let htmlAttributes: HtmlAttribute[] = []
  let sidebarItem: HTMLElement

  // Add a tabIndex attribute to allow the LI to receive focus
  htmlAttributes.push(new HtmlAttribute('tabIndex', 0))
  
  // Create LI elements for each template
  dotNetTemplates.forEach(dotnetTemplate => {
    sidebarItem = dom.createHtmlElement(
      'li',
      'sidebarItems',
      htmlAttributes,
      'list-group-header',
      dotnetTemplate.name
    )

    // Capture the LI click event
    sidebarItem.addEventListener('click', (ev: Event) => {
      // Set focus on the selected LI
      (<HTMLLIElement>ev.target).focus()

      // Set title elements
      const templateTitleIcon = <HTMLImageElement>document.getElementById('templateTitleIcon')
      templateTitleIcon.src = dotnetTemplate.icon
      const templateTitleName = <HTMLDivElement>document.getElementById('templateTitleName')
      templateTitleName.innerText = dotnetTemplate.name
      const templateTitleShortName = <HTMLDivElement>document.getElementById('templateTitleShortName')
      templateTitleShortName.innerText = dotnetTemplate.shortName
      const templateTitleChipContainer = <HTMLSpanElement>document.getElementById('templateTitleChipContainer')
      templateTitleChipContainer.innerHTML = ''
      const projectLegend = <HTMLLegendElement>document.getElementById('projectLegend')
      projectLegend.innerText = `Project Using : ${dotnetTemplate.name}`

      //Load color themes into console header
      htmlAttributes = []
      
      HtmlNamedColors.ColorList.forEach(color => {
        htmlAttributes.push(new HtmlAttribute('value', color))
        
        dom.createHtmlElement(
          'option',
          'consoleThemes',
          htmlAttributes,
          '',
          color)
      })
        
      

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
