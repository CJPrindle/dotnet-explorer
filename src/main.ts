import {app, BrowserWindow, ipcMain, Menu} from 'electron'
import * as path from 'path'

import {ApplicationMenus} from './classes/menus'
import {DotNetCLI} from './classes/dotnet-cli'
import {DotNetTemplate} from './models/dotnet-template'

let mainWindow;
let projectTemplatesJson = '';
const projectTemplatesArray: DotNetTemplate[] = [];

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false
    }
  });

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));
  Menu.setApplicationMenu(ApplicationMenus.getMainTemplate());
  ApplicationMenus.registerShortCuts();

  mainWindow.on('closed', _ => {
    mainWindow = null;
  });
});

ipcMain.on('new-project-load', _ => {
  const cli = new DotNetCLI()
  cli.getTemplateList()
});

ipcMain.on('dotnet-templates-loaded', data => {
  const lines = data.split('\n'); // Convert dotnet CLI stdout to an array of text lines
  let templateStart = 0; // Line where project template table starts

  // Find where the project template list begins
  for (let x = 0; x < lines.length; x++) {
    // Look for header line
    if (lines[x].startsWith('Templates')) {
      templateStart = x + 2;
      break;
    }
  }

  let idx = 0; // Loop counter

  for (let x = templateStart; x < lines.length; x++) {
    if (lines[x].length > 0) {
      // Parse the line and add to the template array
      projectTemplatesArray.push(new DotNetTemplate());
      projectTemplatesArray[idx].type = lines[x].substr(0, 50).trim();
      projectTemplatesArray[idx].shortName = lines[x].substr(50, 18).trim();
      projectTemplatesArray[idx].languages = lines[x].substr(70, 17).trim();
      projectTemplatesArray[idx].tags = lines[x].substr(87).trim();
      idx++;
    }
  }

  projectTemplatesJson = JSON.stringify(projectTemplatesArray); // Serialize to Json
  mainWindow.webContents.send('dotnet-templates-loaded', projectTemplatesJson); // Broadcast event
  //mainWindow.webContents.send('element-create', 'dotnetProjects');
});
