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
  const mainTree = document.getElementById('mainTree')
  const dotNetTemplates: DotNetTemplate[] = JSON.parse(jsonData)

  dotNetTemplates.forEach(dotnetTemplate => {
    mainTree.appendChild(
      dom.createHtmlElement(
        'div',
        'mainTree',
        null,
        null,
        dotnetTemplate.name
      ))
  })
})

ipcRenderer.on('dotnet-templates-loaded', (_: any, templateData: string[][]) => {
  console.log(templateData)
  templateTags = templateData[0].filter(uniqueElements)
  templateLanguages = templateData[1].filter(uniqueElements)
  console.log(templateTags)
  console.log(templateLanguages)
})
