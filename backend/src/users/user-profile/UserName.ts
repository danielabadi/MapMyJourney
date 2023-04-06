export class UserName {
    public readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    private static isValid(name: string): boolean {
        return name != null && name.length >= 5;
    }

    public static create(name: string): UserName {
        if (UserName.isValid(name)) {
            return new UserName(name);
        }
        throw new Error('invalid name');
    }
}
