const { spawn } = require('child_process')
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')
const electron = require('electron')

let processData = ''

module.exports = function loadDotNetTemplates() {
  const child = spawn('dotnet', [ 'new', '--list' ])

  child.stdout.on('data', (data) => {
    processData += decoder.write(data).trim() + '\n'
  })

  child.on('exit', _ => {
    electron.ipcMain.emit('dotnet-templates-loaded', processData)
  })


}
