import {ipcMain} from 'electron'
import {spawn} from 'child_process'
import {StringDecoder} from 'string_decoder'

export class DotNetCLI {
  public getTemplateList(): void {
    const decoder = new StringDecoder('utf8')
    const child = spawn('dotnet', ['new', '--list'])
    let processData = ''

    child.stdout.on('data', (data) => {
      processData += decoder.write(data).trim() + '\n'
    })

    child.on('exit', _ => {
      ipcMain.emit('dotnet-templates-loaded', processData)
    })
  }
}