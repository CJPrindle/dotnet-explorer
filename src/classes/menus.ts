import {app, globalShortcut, Menu, MenuItemConstructorOptions, shell} from 'electron'

export class ApplicationMenus {

  public static getMainTemplate(): Menu {
    const menuTemplate: MenuItemConstructorOptions[]  = [
      {
        label: "File",
        submenu: [
          {
            label: 'New Project',
            accelerator: 'Ctrl+N',
            registerAccelerator: true
          },
          {type: 'separator'},
          {
            label: 'Open Template',
            accelerator: 'Ctrl+O',
            registerAccelerator: true
          },
          {type: 'separator'},
          {
            label: 'Exit',
            click: _ => app.quit(),
            accelerator: 'Ctrl+F4'
          },
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {role: 'cut'},
          {role: 'copy'},
          {type: 'separator'},
          {role: 'paste'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        role: 'window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: 'Documentation',
            click () { shell.openExternal('https://www.github.com/CJPrindle/dotnet-explorer') }
          },
          {label: 'License'},
          {type: 'separator'},
          {
            label: `About ${app.getName()}`,
            role: 'about'

          },
        ]
      },
    ]

    return Menu.buildFromTemplate(menuTemplate)
  }

  public static registerShortCuts(): void {
    globalShortcut.register('Ctrl+N', (_: any) => {
      console.log('Creating new project...')
    })

    globalShortcut.register('Ctrl+O', (_: any) => {
      console.log('Opening existing project...')
    })
  }
}