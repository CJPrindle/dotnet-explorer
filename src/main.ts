import {app, BrowserWindow, Dock, ipcMain, Menu} from 'electron'
import * as path from 'path'
import * as loadDotNetTemplates from './scripts/dotNetProcess'
import {ApplicationMenus} from './menus'
import {dotNetTemplate} from './dotNetTemplate'

let mainWindow
let projectTemplatesJson = ''
const projectTemplatesArray: dotNetTemplate[] = []


app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  Menu.setApplicationMenu(ApplicationMenus.getMainTemplate())
  ApplicationMenus.registerShortCuts()

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})

// When work makes progress, show the progress bar
function onProgress (progress) {
  // Use values 0 to 1, or -1 to hide the progress bar
  mainWindow.setProgressBar(progress || -1) // Progress bar works on all platforms
}

// When work completes while the app is in the background, show a badge
var numDoneInBackground = 0
function onDone () {
  var dock = app.dock // Badge works only on Mac
  if (!dock || mainWindow.isFocused()) return
  numDoneInBackground++
  dock.setBadge('' + numDoneInBackground)
}

// Subscribe to the window focus event. When that happens, hide the badge
function onFocus () {
  numDoneInBackground = 0
  app.dock.setBadge('')
}

// Handle the 'countdown-start event sent from a renderer process
ipcMain.on('dotnet-templates-load', _ => {
  loadDotNetTemplates()
})

ipcMain.on('dotnet-templates-loaded', (data) => {

  const lines = data.split('\n')
  let templateStart = 0

  // Find where the Template list begins
  for (let x = 0; x < lines.length; x++) {
    if (lines[ x ].startsWith('Templates')) {
      templateStart = x + 2
      break
    }
  }

  let idx = 0
  for (let x = templateStart; x < lines.length; x++) {
    // Parse the line and build the Json object
    if (lines[x].length > 0) {
      projectTemplatesArray.push(new dotNetTemplate())
      projectTemplatesArray[idx].type = lines[x].substr(0, 50).trim()
      projectTemplatesArray[idx].shortName = lines[x].substr(50, 18).trim()
      projectTemplatesArray[idx].languages = lines[x].substr(70, 17).trim()
      projectTemplatesArray[idx].tags = lines[x].substr(87).trim()
      idx++
    }
  }

  projectTemplatesJson = JSON.stringify(projectTemplatesArray)

  mainWindow.webContents.send('dotnet-templates-loaded', projectTemplatesJson)
})