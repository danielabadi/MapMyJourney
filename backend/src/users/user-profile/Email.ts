import * as EmailValidator from 'email-validator';

export class Email {
    public readonly email: string;

    private constructor(email: string) {
        this.email = email;
    }

    private static isValid(email: string): boolean {
        return EmailValidator.validate(email);
    }

    public static create(email: string): Email {
        if (Email.isValid(email)) {
            return new Email(email);
        }
        throw new Error('invalid email');
    }
}
