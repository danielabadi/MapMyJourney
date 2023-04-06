export class UserDescription {
    public readonly description: string;

    private constructor(description: string) {
        this.description = description;
    }

    private static isValid(description: string): boolean {
        return description != null && description.length < 500;
    }

    public static create(description: string): UserDescription {
        if (UserDescription.isValid(description)) {
            return new UserDescription(description);
        }
        throw new Error('invalid description');
    }
}
