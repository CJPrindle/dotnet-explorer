/// <reference types="electron-settings"/>
import settings from 'electron-settings'
import { Template } from '../models/Template'

export class SettingsUtil {
  private static favoritesPath: string = 'dotnetUISettings.Templates.Favorites'

  public static ConfigureSettings(): void {
    if (!settings.has('dotnetUISettings')) {
      settings.set('dotnetUISettings', {
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

  public static UnloadFavoriteTemplateList(templatesArray: Template[]): void {

  }

  public static RemoveFavoriteTemplate(template: Template): any {
    let favorites = <Array<any>>settings.get(SettingsUtil.favoritesPath)

    if(favorites.find(t => t === template.ShortName)) {
      favorites.splice (favorites.indexOf(template.ShortName), 1);
      return settings.set(SettingsUtil.favoritesPath, favorites)
    }
    
    return null
  }
}