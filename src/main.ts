import { app, BrowserWindow, ipcMain, Menu, IpcMainEvent } from 'electron'
import { ApplicationMenus } from './classes/ApplicationMenus'
import { DotNetCLI } from './classes/DotNetCLI'
import { SettingsUtil } from './classes/SettingsUtil'
import { Template } from './models/Template'
import { Utilities } from './classes/Utilities'
import * as path from 'path'
import * as modal from 'electron-modal'

 // The Electron host window
let mainWindow: BrowserWindow

// Holds the project templates obtained from the dotnet CLI
const dotNetTemplates: Template[] = []

// Configure settings
SettingsUtil.ConfigureSettings()

// Returns only the unique elements in am array
function uniqueElements(value: any, index: number, self: string | any[]) {
  return self.indexOf(value) === index
}

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    center: true,
    title: "dotnetUI",
    height: 768,
    width: 1366,
    icon: __dirname + '/assets/dotnetUI.png',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: true,
      webgl: true
    }
  })

  mainWindow.maximize()
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  Menu.setApplicationMenu(ApplicationMenus.GetMainTemplate())
  ApplicationMenus.RegisterShortCuts()
 
  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})

ipcMain.on('dotnet-info-click', (data, project) => {
  new DotNetCLI().GetInfo()
})

ipcMain.on('create-project-click', (data, project) => {
  let args: string[] = []
  
  // New project
  args.push('new')

  // Template name
  args.push(project.template.ShortName)

  // Project name
  args.push('-n')
  args.push(project.name)

  // Project path
  args.push('-o')
  args.push(path.join(project.path, project.name))

  const dotnetCLI = new DotNetCLI()
  dotnetCLI.CreateProject(args)
})

// The main DOM has been loaded
ipcMain.on('dom-content-loaded', (_: any) => {
  const cli = new DotNetCLI()
  cli.GetProjectTemplates()
})

ipcMain.on('project-created', (data: any) => {
  mainWindow.webContents.send('project-created-output', data)
})

ipcMain.on('dotnet-info-loaded', (data: any) => {
  mainWindow.webContents.send('dotnet-info-output', data)
})

ipcMain.on('dotnet-projects-loaded', (data) => {
  const lines = data.toString().split('\n') // Convert dotnet CLI output to an array of text lines
  let templatesTable: string[] = []
  let templateLanguages: string[] = []
  let templateTags: string[] = []

  // Send output of a dotnet CLI command
  mainWindow.webContents.send('dotnetCLI-data-output', data)

  // Find where the project template table begins
  for (let x = 0; x < lines.length; x++) {
    if (lines[x].startsWith('Templates')) {
      templatesTable = lines.slice(x + 2, lines.length - 1)
      break
    }
  }

  // Find the starting position of each column using the 'Console Application' template as a guide
  const consoleTemplate = templatesTable.find(template => template.substr(0, 19) == 'Console Application')
  const shortNameStart = consoleTemplate.indexOf('console') // Short name column position
  const languagesStart = consoleTemplate.indexOf('[C#]') // Languages column position
  const tagsStart = consoleTemplate.indexOf('Common') // Tags columns position

  // Sort the templates and loop through to assign additional properties
  templatesTable.sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .forEach(templateLine => {
    
    let dotnetTemplate = new Template()

    dotnetTemplate.Name = templateLine.substr(0, shortNameStart - 1).trim()
    dotnetTemplate.ShortName = templateLine.substr(shortNameStart, (languagesStart - shortNameStart)).trim()

    let languages: string = templateLine.substr(languagesStart, (tagsStart - languagesStart)).trim()
    if (languages.length > 0) {
      dotnetTemplate.Languages = languages.replace('[', '').replace(']', '').split(",")
      templateLanguages = templateLanguages.concat(dotnetTemplate.Languages)
    }

    let tags: string = templateLine.substr(tagsStart, (templateLine.length - tagsStart)).trim()
    if (tags.length > 0) {
      dotnetTemplate.Tags = tags.split("/")
      templateTags = templateTags.concat(tags.split("/"))
    }

    // Assign the template icon and IsFavorite flag
    dotnetTemplate.Icon = Utilities.GetTemplateIcon(dotnetTemplate.Tags)
    dotnetTemplate.IsFavorite = SettingsUtil.IsFavoriteTemplate(dotnetTemplate)
    dotNetTemplates.push(dotnetTemplate)
  })

  console.log('templateLanguages', templateLanguages.filter(uniqueElements))
  console.log('templateTags', templateTags.filter(uniqueElements).sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase())))

  mainWindow.webContents.send('dotnet-projects-loaded', JSON.stringify(dotNetTemplates))
})
