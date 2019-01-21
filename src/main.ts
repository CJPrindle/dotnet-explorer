import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import * as path from 'path';
import * as loadDotNetTemplates from './scripts/dotNetProcess';
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

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  Menu.setApplicationMenu(ApplicationMenus.getMainTemplate());
  ApplicationMenus.registerShortCuts();

  mainWindow.on('closed', _ => {
    console.log('mainWindow Closed');
    mainWindow = null;
  });
});

// Handle the 'countdown-start event sent from a renderer process
ipcMain.on('dotnet-templates-load', _ => {
  loadDotNetTemplates();
});

ipcMain.on('dotnet-templates-loaded', (args) => {
  // Broadcast the 'dotnet-templates-load' event to any renderer process listening for it
  mainWindow.webContents.send('dotnet-templates-loaded', args);
});