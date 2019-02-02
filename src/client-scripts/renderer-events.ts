import {ipcRenderer} from 'electron'
import {DomElements} from './dom';
import {HtmlAttribute} from '../models/html-attribute';

// All client-side event captures go here
window.addEventListener('DOMContentLoaded', _ => {
  const newProject = document.getElementById('newProject')

  // Listeners
  newProject.addEventListener('click', _ => {
    ipcRenderer.send('new-project-load')
  })
})

ipcRenderer.on('dotnet-templates-loaded', (_, data) => {
  document.getElementById('dotnetProjects').innerHTML += data
  document.getElementById('sidebarHeader').innerText = "Project Templates"
})

// **** TESTING
ipcRenderer.on('element-create', (_, elementID, data) => {
  const dom = new DomElements()

  const attribs: HtmlAttribute[] = [
    { name: 'first', value: 'firstBest' },
    { name: 'second',value: 'secondBest' }
  ]

  document.getElementById(elementID).appendChild(
    dom.createHtmlElement(
      'h1',
      'dotnetProjects',
      attribs,
      null,
       'Besting'))
})
