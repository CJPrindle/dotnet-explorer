/// <reference types="electron-settings"/>
import settings from 'electron-settings'
import { Template } from '../models/Template'
import { ConsoleTheme } from '../models/ConsoleTheme'

export class SettingsUtil {
  private static favoritesPath: string = 'dotnetUISettings.Templates.Favorites'
  private static consoleBackgroundColor: string = 'dotnetUISettings.Console.Background'
  private static consoleForegroundColor: string = 'dotnetUISettings.Console.Foreground'
  private static consoleTheme: string = 'dotnetUISettings.Console.Theme'

  public static ConfigureSettings(): void {
    if (!settings.has('dotnetUISettings')) {
      settings.set('dotnetUISettings', {
        Console: {
          Background: '',
          Foreground: '',
          Theme: '',
        },
        Templates: {
          Favorites: [
          ],
        },
        Projects: {
          DefaultPath: '',
          Recent: [
            // The props below are for FYI only
            //Path: 'c:\\path\\to\\project',
            //ProjectFile: 'project-file.csproj',
            //SolutionFile: 'solution-file.sln'
          ],
        },
      })
    }
  }

  public static AddFavoriteTemplate(template: Template): any {
    let favorites = <Array<any>>settings.get(SettingsUtil.favoritesPath)

    if(!favorites.find(t => t === template.ShortName)) {
      favorites.push(template.ShortName)
      return settings.set(SettingsUtil.favoritesPath, favorites)
    }
    
    return null
  }

  public static IsFavoriteTemplate(template: Template): boolean {
    return (<Array<any>>settings.get(SettingsUtil.favoritesPath))
      .find(t => t === template.ShortName) != undefined
  }

  public static LoadFavoriteTemplateList(templates: Template[]): Template[] {
    return templates.filter(template => template.IsFavorite == true)
  }

  public static RemoveFavoriteTemplate(template: Template): any {
    let favorites = <Array<any>>settings.get(SettingsUtil.favoritesPath)

    if(favorites.find(t => t === template.ShortName)) {
      favorites.splice (favorites.indexOf(template.ShortName), 1);
      return settings.set(SettingsUtil.favoritesPath, favorites)
    }
    
    return null
  }

  public static GetConsoleTheme(theme: string, background: string, foreground: string): ConsoleTheme {
    let consoleTheme = new ConsoleTheme()
    consoleTheme.Background = SettingsUtil.consoleBackgroundColor
    consoleTheme.ForeGround = SettingsUtil.consoleForegroundColor
    consoleTheme.Name = SettingsUtil.consoleTheme

    return consoleTheme
  }

  public static SetConsoleTheme(theme: string, background: string, foreground: string): void {
    settings.set(SettingsUtil.consoleBackgroundColor, background)
    settings.set(SettingsUtil.consoleForegroundColor, foreground)
    settings.set(SettingsUtil.consoleTheme, theme)
  }
}
