import { ipcRenderer } from 'electron'


ipcRenderer.on('sdk-data-ready', (_: any, data: string) => {
//   const sdkVersion = <HTMLSpanElement>document.getElementById('sdkVersion')
//   const sdkCommit = <HTMLSpanElement>document.getElementById('sdkCommit')
//   const osName = <HTMLSpanElement>document.getElementById('osName')
//   const osVersion = <HTMLSpanElement>document.getElementById('osVersion')
//   const osPlatform = <HTMLSpanElement>document.getElementById('osPlatform')
//   const runtime = <HTMLSpanElement>document.getElementById('runtime')
//   const basePath = <HTMLSpanElement>document.getElementById('basePath')
  const sdk = <HTMLPreElement>document.getElementById('sdk')
  sdk.innerHTML = data
  const lines = data.toString().split('\n') 

//   for (let x = 0; x < lines.length; x++) {
//     if (lines[x].startsWith('.NET Core SDK ')) {
//       const versionLines = lines.slice(x + 1, x+3)
      
//       const version = versionLines[0].substring(10, versionLines[0].length).trim()
//       sdkVersion.innerHTML = version
      
//       const commit = versionLines[1].substring(10, versionLines[1].length).trim()
//       sdkCommit.innerHTML = commit
//     }

//     if (lines[x].trim().startsWith('OS Name:')) {
//         osName.innerHTML = lines[x].trim().substring(8, lines[x].length).trim()
//     }

//     if (lines[x].trim().startsWith('OS Version:')) {
//         osVersion.innerHTML = lines[x].trim().substring(11, lines[x].length).trim()
//     }

//     if (lines[x].trim().startsWith('OS Platform:')) {
//         osPlatform.innerHTML = lines[x].trim().substring(13, lines[x].length).trim()
//     }

//     if (lines[x].trim().startsWith('RID:')) {
//         runtime.innerHTML = lines[x].trim().substring(4, lines[x].length).trim()
//     }


//   }
})
