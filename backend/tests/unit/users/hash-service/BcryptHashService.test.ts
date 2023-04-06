import { BcryptHashService } from '../../../../src/users/hash-service/HashService';

describe('Password hashing', () => {
    it('should successfully hash a valid password', async () => {
        const hashService = new BcryptHashService();
        const passwordToBeHashed = 'teste';
        const hashedPassword: string = await hashService.hashPassword(passwordToBeHashed);

        expect(hashService.isSamePassword(passwordToBeHashed, hashedPassword)).toBeTruthy();
    });
});
