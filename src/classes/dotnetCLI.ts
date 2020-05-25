import {ipcMain, ipcRenderer} from 'electron'
import {spawn} from 'child_process'
import {StringDecoder} from 'string_decoder'
import {DotNetCLIHistory} from '../models/dotnetCLIHistory'

export class DotnetCLI {
  public static readonly ProcessName = 'dotnet'
  public static CommandHistory: DotNetCLIHistory[]

  public getItemTemplates(): void {
    // TODO: Find template guide
    this.executeCommand(['new', '--type', 'item'], 'dotnet-items-loaded')
  }

  public getProjectTemplates(): void {
    this.executeCommand(['new', '--type', 'project'], 'dotnet-projects-loaded')
  }

  private executeCommand(dotnetArgs: string[], emitEvent: string): void {
    const decoder = new StringDecoder('utf8')
    const child = spawn(DotnetCLI.ProcessName, dotnetArgs)
    let dotnetOutput = ''

    child.stdout.on('data', (data: Buffer) => {
      dotnetOutput += decoder.write(data).trim() + '\n'
    })

    child.on('exit', _ => {

      ipcMain.emit(emitEvent, dotnetOutput)
    })
  }
}