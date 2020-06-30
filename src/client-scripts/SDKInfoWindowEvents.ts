import { ipcRenderer, OpenExternalOptions } from 'electron'
import { Utilities } from '../classes/utilities'


ipcRenderer.on('sdk-data-ready', (_: any, data: string) => {
  const sdkVersion = <HTMLDivElement>document.getElementById('sdkVersion')
  const sdkCommit = <HTMLDivElement>document.getElementById('sdkCommit')
  const getMoreTemplates = <HTMLButtonElement>document.getElementById('getMoreTemplates')

  getMoreTemplates.addEventListener('click', (_: any) => {
    Utilities.OpenExternalWebSite('https://aka.ms/dotnet-download', <OpenExternalOptions>{ activate: true, })
  })

  const lines = data.toString().split('\n')

  for (let x = 0; x < lines.length; x++) {
    if (lines[x].startsWith('.NET Core SDK ')) {
      const versionLines = lines.slice(x + 1, x + 3)

      const version = versionLines[0].substring(10, versionLines[0].length).trim()
      sdkVersion.innerHTML = version

      const commit = versionLines[1].substring(10, versionLines[1].length).trim()
      sdkCommit.innerHTML = commit
    }
  }
})
