import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { ApplicationMenus } from './classes/menus'
import { DotnetCLI } from './classes/dotnetCLI'
import { DotNetTemplate } from './models/dotnetTemplate'
import { spawn } from 'child_process'
import { Utilities } from './classes/utilities'
import * as path from 'path'

// The Electron host window
let mainWindow: BrowserWindow
// Holds the project templates obtained from the dotnet CLI
const dotNetTemplates: DotNetTemplate[] = []


function uniqueElements(value: any, index: number, self: string | any[]) {
  return self.indexOf(value) === index
}

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 768,
    width: 1366,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: true,
      webgl: true
    }
  })

  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  Menu.setApplicationMenu(ApplicationMenus.getMainTemplate())
  ApplicationMenus.registerShortCuts()

  //mainWindow.webContents.send('element-create', 'dotnetProjects')

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})

ipcMain.on('open-vs-code', (_: any) => {
  const vsCode = spawn('cmd.exe', ['/C', 'C:\\local\\VS Code\\Code.exe'])

  vsCode.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  
  vsCode.stderr.on('data', (data) => {
    console.log(data.toString())
  })
})

ipcMain.on('new-project-load', (_: any) => {
  const cli = new DotnetCLI()
  cli.getProjectTemplates()
})

ipcMain.on('dotnet-projects-loaded', (data: string) => {
  const lines = data.split('\n') // Convert dotnet CLI output to an array of text lines
  let templatesTable: string[] = []
  let templateLanguages: string[] = []
  let templateTags: string[] = []

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

  templatesTable.sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach(templateLine => {
    let dotnetTemplate = new DotNetTemplate()

    dotnetTemplate.name = templateLine.substr(0, shortNameStart - 1).trim()
    dotnetTemplate.shortName = templateLine.substr(shortNameStart, (languagesStart - shortNameStart)).trim()

    let languages: string = templateLine.substr(languagesStart, (tagsStart - languagesStart)).trim()
    if (languages.length > 0) {
      dotnetTemplate.languages = languages.replace('[', '').replace(']', '').split(",")
      templateLanguages = templateLanguages.concat(dotnetTemplate.languages)
    }

    let tags: string = templateLine.substr(tagsStart, (templateLine.length - tagsStart)).trim()
    if (tags.length > 0) {
      dotnetTemplate.tags = tags.split("/")
      templateTags = templateTags.concat(tags.split("/"))
    }

    dotnetTemplate.icon = Utilities.getTemplateIcon(dotnetTemplate.tags)
    dotNetTemplates.push(dotnetTemplate)
  })

  console.log('templateLanguages', templateLanguages.filter(uniqueElements))
  console.log('templateTags', templateTags.filter(uniqueElements).sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase())))

  mainWindow.webContents.send('dotnet-projects-loaded', JSON.stringify(dotNetTemplates))
})
