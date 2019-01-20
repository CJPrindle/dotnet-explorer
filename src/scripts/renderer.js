//const electron = require('electron');
//const ipc = electron.ipcRenderer;
import { ipcRenderer } from 'electron';

document.getElementById('start').addEventListener('click', _ => {
  // Broadcast the 'countdown-start' event to the Main process
  ipcRenderer.send('countdown-start')
});

// Handle the 'countdown' event broadcast from the Main process
ipcRenderer.on('countdown', (evt, count) => {
  document.getElementById('count').innerHTML = count;
});
