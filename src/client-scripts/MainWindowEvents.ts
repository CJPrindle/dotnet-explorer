import { ipcRenderer, OpenDialogOptions, OpenExternalOptions, remote } from 'electron'
import { SettingsUtil } from '../classes/settingsUtil'
import { Template } from '../models/Template'
import { Utilities } from '../classes/utilities'
import * as path from 'path'


window.addEventListener('DOMContentLoaded', _ => {
  const clearNewProjectForm = <HTMLButtonElement>document.getElementById('clearNewProjectForm')
  const consoleThemes = <HTMLSelectElement>document.getElementById('consoleThemes')
  const createProject = <HTMLButtonElement>document.getElementById('createProject')
  const defaultEditor = <HTMLButtonElement>document.getElementById('defaultEditor')
  const defaultProjectFolder = <HTMLButtonElement>document.getElementById('defaultProjectFolder')
  const favoriteTemplate = <HTMLInputElement>document.getElementById('favoriteTemplate')
  const getMoreTemplates = <HTMLAnchorElement>document.getElementById('getMoreTemplates')
  const newProjectForm = <HTMLFormElement>document.getElementById('newProjectForm')
  const outputConsole = <HTMLDivElement>document.getElementById('console')
  const projectDryRun = <HTMLInputElement>document.getElementById('projectDryRun')
  const projectFolder = <HTMLButtonElement>document.getElementById('projectFolder')
  const projectForce = <HTMLInputElement>document.getElementById('projectForce')
  const projectLanguages = <HTMLSelectElement>document.getElementById('projectLanguages')
  const projectLocation = <HTMLInputElement>document.getElementById('projectLocation')
  const projectName = <HTMLInputElement>document.getElementById('projectName')
  const projectOpen = <HTMLInputElement>document.getElementById('projectOpen')
  const sdkInfo = <HTMLButtonElement>document.getElementById('sdkInfo')
  const viewFavorites = <HTMLInputElement>document.getElementById('viewFavorites')

  sdkInfo.addEventListener('click', () => {
    ipcRenderer.send('dotnet-info-click')
  })

  viewFavorites.addEventListener('click', () => {
    if (viewFavorites.checked) {
      Utilities.LoadSidebarTemplates(
        <Template[]>SettingsUtil.LoadFavoriteTemplateList(Utilities.CurrentTemplates),
        false)
    }
    else {
      Utilities.LoadSidebarTemplates(
        <Template[]>Utilities.CurrentTemplates, true)
    }
  })

  favoriteTemplate.addEventListener('click', () => {
    favoriteTemplate.checked
      ? SettingsUtil.AddFavoriteTemplate(Utilities.CurrentTemplate)
      : SettingsUtil.RemoveFavoriteTemplate(Utilities.CurrentTemplate)
  })

  createProject.addEventListener('click', () => {
    const projectValues = {
      dryRun: projectDryRun.checked,
      force: projectForce.checked,
      language: projectLanguages.options[projectLanguages.selectedIndex].innerText,
      name: projectName.value,
      open: projectOpen.checked,
      path: projectLocation.value,
      template: Utilities.CurrentTemplate
    }

    ipcRenderer.send('create-project-click', projectValues)
  })

  clearNewProjectForm.addEventListener('click', () => {
    newProjectForm.reset()
  })

  getMoreTemplates.addEventListener('click', (_: any) => {
    Utilities.OpenExternalWebSite('https://dotnetnew.azurewebsites.net', <OpenExternalOptions>{ activate: true, })
  })

  defaultEditor.addEventListener('click', (_: any) => {
    const dialogOptions: OpenDialogOptions = {
      defaultPath: SettingsUtil.GetDefaultEditor(),
      title: 'Set Default Project Location',
      properties: ['openFile'],
      message: 'Select the default editor for your projects',
    }

    remote.dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions)
      .then((data: any) => {
        SettingsUtil.SetDefaultProjectLocation(projectLocation.value = data.filePaths.length > 0 ? data.filePaths[0] : '')
      })
  })

  // Set the default project location
  defaultProjectFolder.addEventListener('click', (_: any) => {
    const dialogOptions: OpenDialogOptions = {
      defaultPath: SettingsUtil.GetDefaultProjectLocation(),
      title: 'Set Default Project Location',
      properties: ['openDirectory'],
      message: 'Select the default location for your projects',
    }

    remote.dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions)
      .then((data: any) => {
        SettingsUtil.SetDefaultProjectLocation(projectLocation.value = data.filePaths.length > 0 ? data.filePaths[0] : '')
      })
  })

  // Set the project location
  projectFolder.addEventListener('click', (_: any) => {
    const dialogOptions: OpenDialogOptions = {
      defaultPath: SettingsUtil.GetDefaultProjectLocation(),
      title: 'Set Project Location',
      properties: ['openDirectory'],
      message: 'Select the location of your project',
    }

    remote.dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions)
      .then((data: any) => {
        projectLocation.value = data.filePaths.length > 0 ? data.filePaths[0] : ''
      })
  })

  // Handles a console theme change
  consoleThemes.addEventListener('change', (_: any) => {
    let consoleBackground = ''
    let consoleForeground = ''
    let consoleTheme = ''

    switch (consoleThemes.value) {
      case 'grass':
        consoleBackground = 'DarkGreen'
        consoleForeground = 'AntiqueWhite'
        consoleTheme = 'grass'
        break
      case 'manpages':
        consoleBackground = 'PaleGoldenRod'
        consoleForeground = 'black'
        consoleTheme = 'manpages'
        break
      case 'novel':
        consoleBackground = 'NavajoWhite'
        consoleForeground = 'brown'
        consoleTheme = 'novel'
        break
      case 'redsands':
        consoleBackground = 'DarkRed'
        consoleForeground = 'LemonChiffon'
        consoleTheme = 'redsands'
        break
      default:
        consoleBackground = ''
        consoleForeground = ''
    }

    outputConsole.style.backgroundColor = consoleBackground
    outputConsole.style.color = consoleForeground

    SettingsUtil.SetConsoleTheme(consoleTheme, consoleBackground, consoleForeground)
  })

  // Broadcast the main window has beed loaded
  ipcRenderer.send('dom-content-loaded')
})

// Process the output from a CLI command
ipcRenderer.on('project-created-output', (_: any, data: string) => {
  const consoleOutput = <HTMLPreElement>document.getElementById('consoleOutput')
  consoleOutput.innerText = data
})

// Process the output from a CLI command
ipcRenderer.on('dotnetCLI-data-output', (_: any, data: string) => {
  const consoleOutput = <HTMLPreElement>document.getElementById('consoleOutput')
  consoleOutput.innerText = data
})

// Called after the template list from the dotnet CLI has been parsed.
// Creates LI elements for each template and adds them to the main list
ipcRenderer.on('dotnet-projects-loaded', (_: any, jsonData: string) => {
  Utilities.LoadSidebarTemplates(<Template[]>JSON.parse(jsonData))
})

ipcRenderer.on('dotnet-templates-loaded', (_: any) => {
})

// Called after 'dotnet --info'
ipcRenderer.on('dotnet-info-output', (_: any, data: string) => {
  const sdkWindow = Utilities.CreateModalWindow('dotnet SDK Information', 490, 440)

  sdkWindow.loadURL(path.join('file://', __dirname, '../sdkInfo.html'))
    .then((_: any) => {
      sdkWindow.webContents.send('sdk-data-ready', data)
    })
})
