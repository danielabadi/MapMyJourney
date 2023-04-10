import { validate as uuidValidate } from 'uuid';

export class MarkerId {
    public readonly id: string;

    private constructor(id: string) {
        this.id = id;
    }

    private static isValid(id: string): boolean {
        return uuidValidate(id);
    }

    public static create(id: string): MarkerId {
        if (MarkerId.isValid(id)) {
            return new MarkerId(id);
        }
        throw new Error('invalid id');
    }
}
