import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import * as path from 'path';
import * as countdown from './scripts/countdown';
import {ApplicationMenus} from './menus';

let mainWindow;

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false
    }
  });

  Menu.setApplicationMenu(ApplicationMenus.getMenuTemplate());

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  mainWindow.on('closed', _ => {
    console.log('mainWindow Closed');
    mainWindow = null;
  });
});

// Handle the 'countdown-start event sent from a renderer process
ipcMain.on('countdown-start', _ => {
  countdown(count => {

    // Broadcast the 'countdown' to any renderer process listening for it
    mainWindow.webContents.send('countdown', count);
  });
});