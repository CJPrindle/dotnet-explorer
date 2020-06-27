import {ipcMain} from 'electron'
import {spawn} from 'child_process'
import {StringDecoder} from 'string_decoder'
import {CommandHistory} from '../models/CommandHistory'

export class DotNetCLI {
  public static readonly ProcessName = 'dotnet'
  public static CommandHistory: CommandHistory[]

  public GetItemTemplates(): void {
    // TODO: Find template guide
    this.ExecuteCommand(['new', '--type', 'item'], 'dotnet-items-loaded')
  }

  // Creates a new dotnet project based on a project template selected by the user
  public CreateProject(args: string[]): void {
    this.ExecuteCommand(args, 'project-created')
  }

  // Gets the dotnet templates filtering on type 'project'
  public GetProjectTemplates(): void {
    this.ExecuteCommand(['new', '--type', 'project'], 'dotnet-projects-loaded')
  }

  public GetInfo(): void {
    this.ExecuteCommand(['--info'], 'dotnet-info-loaded')
  }

  private ExecuteCommand(dotnetArgs: string[], emitEvent: string): void {
    const decoder = new StringDecoder('utf8')
    const child = spawn(DotNetCLI.ProcessName, dotnetArgs)
    let dotnetOutput = ''

    child.stdout.on('data', (data: Buffer) => {
      dotnetOutput += decoder.write(data).trim() + '\n'
    })

    child.on('exit', _ => {
      ipcMain.emit(emitEvent, dotnetOutput)
    })
  }
}