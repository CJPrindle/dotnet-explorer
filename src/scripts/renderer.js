const electron = require('electron')
const ipc = electron.ipcRenderer

ipc.send('dotnet-templates-load')

ipc.on('dotnet-templates-loaded', (_, data) => {
  document.getElementById('dotnetProjects').innerHTML += data
})
