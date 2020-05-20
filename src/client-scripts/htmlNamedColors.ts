import * as HtmlColors from '../client-scripts/htmlColors.json';

export class HtmlNamedColors {
    public static getColor(name: string): string {
        return HtmlColors.Colors.find(color => color == name)
    }

    public static get ColorList() : string[] {
        return HtmlColors.Colors
    }
}
