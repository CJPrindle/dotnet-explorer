import { app, globalShortcut, Menu, MenuItemConstructorOptions, shell } from 'electron'

export class ApplicationMenus {

  public static GetMainTemplate(): Menu {
    const menuTemplate: MenuItemConstructorOptions[] = [
      {
        label: "File",
        submenu: [
          {
            label: 'New Project',
            accelerator: 'Ctrl+N',
            registerAccelerator: true
          },
          { type: 'separator' },
          {
            label: 'Open Template',
            accelerator: 'Ctrl+O',
            registerAccelerator: true
          },
          { type: 'separator' },
          {
            label: 'Exit',
            click: (_: any) => { return app.quit() },
            accelerator: 'Ctrl+F4'
          },
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'cut' },
          { role: 'copy' },
          { type: 'separator' },
          { role: 'paste' },
          { role: 'delete' },
          { role: 'selectAll' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
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
            click() { shell.openExternal('https://www.github.com/CJPrindle/dotnet-explorer') }
          },
          { label: 'License' },
          { type: 'separator' },
          {
            label: `About ${app.getName()}`,
            role: 'about'

          },
        ]
      },
    ]

    return Menu.buildFromTemplate(menuTemplate)
  }

  public static RegisterShortCuts(): void {
    globalShortcut.register('Ctrl+N', () => {
      console.log('Creating new project...')
    })

    globalShortcut.register('Ctrl+O', () => {
      console.log('Opening existing project...')
    })
  }
}