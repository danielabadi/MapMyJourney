import { Email } from '../../../../src/users/user-profile/Email';

describe('When creating a valid email', () => {
    it('should successfully return an email instance', async () => {
        const email = 'teste@teste.com';
        expect(() => Email.create(email)).not.toThrow();
        expect(Email.create(email).email).toEqual(email);
    });
});

describe('When creating an invalid email', () => {
    it('should return an error', async () => {
        expect(() => Email.create('testeteste.com')).toThrow();
    });
});
