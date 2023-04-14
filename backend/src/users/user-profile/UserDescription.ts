export class UserDescription {
    public readonly description: string | null;

    private constructor(description: string | null) {
        this.description = description;
    }

    private static isValid(description: string | null): boolean {
        return description == null || description.length < 500;
    }

    public static create(description: string | null): UserDescription {
        if (UserDescription.isValid(description)) {
            return new UserDescription(description);
        }
        throw new Error('invalid description');
    }
}
