import {app, Menu, MenuItemConstructorOptions, shell} from 'electron';

export class ApplicationMenus {

  public static getMenuTemplate(): Menu {

    const menuTemplate: MenuItemConstructorOptions[]  = [
      {
        label: "File",
        submenu: [
          {label: 'New Project'},
          {type: 'separator'},
          {label: 'Open Template'},
          {type: 'separator'},
          {label: 'Exit'},
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
          {label: `About ${app.getName()}`},
        ]
      },
    ];

    return Menu.buildFromTemplate(menuTemplate);
  }
}