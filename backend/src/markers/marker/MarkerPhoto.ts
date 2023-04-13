export class MarkerPhoto {
    public readonly filename: string;

    private constructor(filename: string) {
        this.filename = filename;
    }

    private static isValid(filename: string): boolean {
        return filename != null;
    }

    public static create(filename: string): MarkerPhoto {
        if (MarkerPhoto.isValid(filename)) {
            return new MarkerPhoto(filename);
        }
        throw new Error('invalid photo');
    }
}
