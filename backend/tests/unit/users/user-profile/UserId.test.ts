import { v4 } from 'uuid';
import { UserId } from '../../../../src/users/user-profile/UserId';

describe('When creating a valid user id with uuid', () => {
    it('should successfully return an user id instance', async () => {
        const uuid = v4();
        expect(() => UserId.create(uuid)).not.toThrow();
        expect(UserId.create(uuid).id).toEqual(uuid);
    });
});

describe('When creating an invalid user id', () => {
    it('should return an error', async () => {
        expect(() => UserId.create('teste')).toThrow();
    });
});
