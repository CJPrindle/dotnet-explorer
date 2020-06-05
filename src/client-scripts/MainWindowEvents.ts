import { ipcRenderer, OpenDialogOptions, OpenExternalOptions, remote, shell} from 'electron'
import { SettingsUtil } from '../classes/SettingsUtil'
import { Template } from '../models/Template'
import { Utilities } from '../classes/Utilities'
import * as path from 'path'


window.addEventListener('DOMContentLoaded', _ => {
  const openFolderDialog = <HTMLButtonElement>document.getElementById('openFolderDialog')
  const createProject = <HTMLButtonElement>document.getElementById('createProject')
  const clearNewProjectForm = <HTMLAnchorElement>document.getElementById('clearNewProjectForm')
  const consoleThemes = <HTMLSelectElement>document.getElementById('consoleThemes')
  const favoriteTemplate = <HTMLInputElement>document.getElementById('favoriteTemplate')
  const getTemplates = <HTMLAnchorElement>document.getElementById('getTemplates')
  const newProjectForm = <HTMLFormElement>document.getElementById('newProjectForm')
  const outputConsole = <HTMLDivElement>document.getElementById('console')
  const projectDryRun = <HTMLInputElement>document.getElementById('projectDryRun')
  const projectForce = <HTMLInputElement>document.getElementById('projectForce')
  const projectLanguages = <HTMLSelectElement>document.getElementById('projectLanguages')
  const projectLocation = <HTMLInputElement>document.getElementById('projectLocation')
  const projectName = <HTMLInputElement>document.getElementById('projectName')
  const projectOpen = <HTMLInputElement>document.getElementById('projectOpen')
  const viewFavorites = <HTMLInputElement>document.getElementById('viewFavorites')
  const sdkInfo = <HTMLButtonElement>document.getElementById('sdkInfo')
  
  sdkInfo.addEventListener('click', () => {
    ipcRenderer.send('dotnet-info-click')
  })

  viewFavorites.addEventListener('click', () => {
    if(viewFavorites.checked) {
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
    // Handles the creation of a new project
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

  // Clears the form elements when creating a new project
  clearNewProjectForm.addEventListener('click', () => {
    newProjectForm.reset()
  })

  // Options for opening the dotnet template web site
  let shellOptions: OpenExternalOptions = {
    activate: true
  }

  // Launches a browser and navigates to the dotnet template website
  getTemplates.addEventListener('click', () => {
    shell.openExternal('https://dotnetnew.azurewebsites.net'),
    shellOptions
  })
 
  // Opens a dialog window for choosing a folder
  openFolderDialog.addEventListener('click', () => {
    // Options for opening the file selection dialog
    const dialogOptions: OpenDialogOptions = {
      title: "Set Project Location",
      properties: ["openDirectory"],
      message: "Select the location of your project",
    }

    remote.dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions)
      .then((data) => {
        projectLocation.value = data.filePaths.length > 0 ? data.filePaths[0] : ''
      })
  })

  // Handles a console theme change
  consoleThemes.addEventListener('change', () => {
    switch(consoleThemes.value) {
      case "grass":
        outputConsole.style.backgroundColor = "DarkGreen"
        outputConsole.style.color = "AntiqueWhite"
        break
      case "manpages":
        outputConsole.style.backgroundColor = "PaleGoldenRod"
        outputConsole.style.color = "black"
        break
      case "novel":
        outputConsole.style.backgroundColor = "NavajoWhite"
        outputConsole.style.color = "brown"
        break
      case "redsands":
          outputConsole.style.backgroundColor = "DarkRed"
          outputConsole.style.color = "LemonChiffon"
          break  
      
      default:
        outputConsole.style.backgroundColor = ""
        outputConsole.style.color = ""
    }
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
    .then(_ => {
      sdkWindow.webContents.send('sdk-data-ready', data)
    })
})
