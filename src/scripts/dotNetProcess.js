const { spawn } = require('child_process');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const electron = require('electron');

module.exports = function loadDotNetTemplates() {
  const child = spawn('dotnet', [ 'new', '--list' ]);

  child.stdout.on('data', (data) => {
    var message = decoder.write(data);
    console.log(message.trim());
    const ipc = electron.ipcMain;
    ipc.emit('dotnet-templates-loaded', message.trim());
  })


}

