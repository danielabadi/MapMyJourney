import { UserName } from '../../../../src/users/user-profile/UserName';

describe('When creating a valid user name with 5 or more characters', () => {
    it('should successfully return an user name instance', async () => {
        const userName = 'teste!!';
        expect(() => UserName.create(userName)).not.toThrow();
        expect(UserName.create(userName).name).toEqual(userName);
    });
});

describe('When creating an invalid user name with less than 5 characters', () => {
    it('should return an error', async () => {
        expect(() => UserName.create('abc')).toThrow();
    });
});
