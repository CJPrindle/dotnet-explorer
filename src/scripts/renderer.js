const electron = require('electron');
const ipc = electron.ipcRenderer;

// Broadcast the 'dotnetCli-load' event to the Main process
ipc.send('dotnet-templates-load');

// Handle the 'dotnet-templates-load' event broadcast from the Main process
ipc.on('dotnet-templates-loaded', (evt, args) => {
  document.getElementById('dotnetProjects').innerHTML = args;
});
