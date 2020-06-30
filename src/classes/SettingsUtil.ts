/// <reference types="electron-settings"/>
import { ConsoleTheme } from '../models/ConsoleTheme'
import { Template } from '../models/Template'
import settings from 'electron-settings'

export class SettingsUtil {
  private static consoleBackgroundColor: string = 'dotnetUISettings.Console.Background'
  private static consoleForegroundColor: string = 'dotnetUISettings.Console.Foreground'
  private static consoleTheme: string = 'dotnetUISettings.Console.Theme'
  private static defaultEditor: string = 'dotnetUISettings.Projects.DefaultEditor'
  private static defaultProjectLocation: string = 'dotnetUISettings.Projects.DefaultPath'
  private static favoritesPath: string = 'dotnetUISettings.Templates.Favorites'

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
          DefaultEditor: '',
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

  public static GetDefaultEditor(): string {
    return settings.get(SettingsUtil.defaultEditor).toString()
  }

  public static SetDefaultEditor(path: string): void {
    settings.set(SettingsUtil.defaultEditor, path)
  }

  public static GetDefaultProjectLocation(): string {
    return settings.get(SettingsUtil.defaultProjectLocation).toString()
  }

  public static SetDefaultProjectLocation(path: string): void {
    settings.set(SettingsUtil.defaultProjectLocation, path)
  }

  public static GetConsoleTheme(): ConsoleTheme {
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
