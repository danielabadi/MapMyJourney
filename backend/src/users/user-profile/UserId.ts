import { validate as uuidValidate } from 'uuid';

export class UserId {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    private static isValid(id: string): boolean {
        return uuidValidate(id);
    }

    public static create(id: string): UserId {
        if (UserId.isValid(id)) {
            return new UserId(id);
        }
        throw new Error('invalid id');
    }
}
