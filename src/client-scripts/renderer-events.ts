import {ipcRenderer} from 'electron'
import {domElements} from './dom';

ipcRenderer.send('dotnet-templates-load')

ipcRenderer.on('dotnet-templates-loaded', (_, data) => {
  document.getElementById('dotnetProjects').innerHTML += data
})

ipcRenderer.on('element-created', (_, elementID, data) => {
  const dom = new domElements();

  document.getElementById(elementID).appendChild(
    dom.createHtmlElement(
      'h1',
      'dotnetProjects',
      null, 'Besting'))
})
