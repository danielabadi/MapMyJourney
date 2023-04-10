export class MarkerTitle {
    public readonly title: string;

    private constructor(title: string) {
        this.title = title;
    }

    private static isValid(title: string): boolean {
        return title != null && title.length <= 50;
    }

    public static create(title: string): MarkerTitle {
        if (MarkerTitle.isValid(title)) {
            return new MarkerTitle(title);
        }
        throw new Error('invalid title');
    }
}
