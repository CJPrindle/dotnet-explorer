import { ipcRenderer } from 'electron'
import { DocumentModel } from './documentModel';
import { HtmlAttribute } from '../models/htmlAttribute';
import { DotNetTemplate } from '../models/dotnetTemplate';

let templateTags: string[] = []
let templateLanguages: string[] = []

window.addEventListener('DOMContentLoaded', _ => {
  ipcRenderer.send('new-project-load')
})

function uniqueElements(value, index, self) {
  return self.indexOf(value) === index
}

ipcRenderer.on('dotnet-projects-loaded', (_: any, jsonData: string) => {
  const dom = new DocumentModel()
  const projectList = document.getElementById('projectList')
  const projectDetails = document.getElementById('projectDetails')
  const dotNetTemplates: DotNetTemplate[] = JSON.parse(jsonData)
  let projectItem: HTMLElement

  dotNetTemplates.forEach(dotnetTemplate => {
    projectItem = dom.createHtmlElement(
      'li',
      'projectList',
      null,
      'list-group-header',
      dotnetTemplate.name
    )

    projectItem.addEventListener('click', (ev) => {
      const templateTitleIcon = <HTMLImageElement>document.getElementById('templateTitleIcon')
      templateTitleIcon.src = `./assets/templates/${dotnetTemplate.icon}.png`
      const templateTitleName = <HTMLDivElement>document.getElementById('templateTitleName')
      templateTitleName.innerText = dotnetTemplate.name
      const templateTitleShortName = <HTMLDivElement>document.getElementById('templateTitleShortName')
      templateTitleShortName.innerText = dotnetTemplate.shortName
      const templateTitleChipContainer = <HTMLSpanElement>document.getElementById('templateTitleChipContainer')
      templateTitleChipContainer.innerHTML = ''

      // Create chips for languages
      dotnetTemplate.languages.forEach(language => {
        dom.createHtmlElement(
          'span',
          'templateTitleChipContainer',
          null,
          'chip',
          language)
      });

      // Create chips for tags
      dotnetTemplate.tags.forEach(tag => {
        dom.createHtmlElement(
          'span',
          'templateTitleChipContainer',
          null,
          'chip',
          tag)
      });
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
