import  * as fs from 'fs';
import  * as path from 'path';

export class Utilities {
    public static getTemplateIcon(tags: string[]): string {
        let templateImagesPath = path.join(__dirname, '../assets/templates')
        let templateImage = ''
        
        // Start with the most specific tag and work towards the more common
        try {
            for(let x = tags.length - 1; x >= 0; x--) {
                templateImage = path.join(templateImagesPath, `${tags[x].toLowerCase()}.png`)

                if(fs.existsSync(templateImage)) {
                    return templateImage
                }
            }
        }
        catch(e) {}
        
        return 'assets/templates/default.png'
    }
}