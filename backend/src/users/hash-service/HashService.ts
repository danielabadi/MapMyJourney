import bcrypt from 'bcrypt';

export interface HashService {
    hashPassword(plainTextPassword: string): Promise<string>;
    isSamePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}

export class BcryptHashService implements HashService {
    public async hashPassword(plainTextPassword: string): Promise<string> {
        return await bcrypt.hash(plainTextPassword, 10);
    }

    public async isSamePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
