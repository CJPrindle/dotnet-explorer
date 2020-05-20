import  * as fs from 'fs';
import  * as path from 'path';

export class Utilities {

    public static getTemplateIcon(tags: string[]): string {
        let templateImagesPath = path.join(__dirname, '../assets/templates')
//        let templateImagesPath = '/assets/templates'

        let iconFound = false
        
        // Start with the most specific tag and work towards the more common
        try {
            for(let x = tags.length; x >= 0; x--) {
                templateImagesPath = path.join(templateImagesPath, `${tags[x]}.png`)

                if(fs.existsSync(templateImagesPath)) {
                    return templateImagesPath
                    //iconFound = true
                    //break;
                }
            }
        }
        catch(e) {}
        
        return '/assets/templates/default.png'
        
        // if(iconFound == true) {
        //     return templateImagesPath
        // }
        // else {
        //     return '/bin/assets/templates/default.png'
        //     //return path.join(__dirname, '../assets/templates/default.png')
        // }
    }
}