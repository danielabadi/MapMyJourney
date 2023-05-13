import { v4 } from 'uuid';
import { USERS_TABLE_NAME } from '../../../database/consts/DbTableNames';
import { Email } from '../../../src/users/user-profile/Email';
import { UserDescription } from '../../../src/users/user-profile/UserDescription';
import { UserId } from '../../../src/users/user-profile/UserId';
import { UserName } from '../../../src/users/user-profile/UserName';
import { UserProfile } from '../../../src/users/user-profile/UserProfile';
import { SQLUserProfileRepository } from '../../../src/users/user-profile/UserProfileRepository';
import { TestsUtils } from '../TestsUtils';

const db = TestsUtils.getDb();
beforeAll(async () => {
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('User registration', () => {
    it('should return user id and registered user should be able to be accessed', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const userId = UserId.create(v4());
        const email = Email.create('teste@teste.com');
        const name = UserName.create('teste!');
        const birthdate = new Date('1942-12-07');
        const description = UserDescription.create('teste');
        const password = 'teste';
        const user = UserProfile.create(userId, email, name, birthdate, description, password);

        const registerdUserId = await UserProfileRepository.insert(user);

        expect(registerdUserId.id).toEqual(userId.id);

        const getUser = await UserProfileRepository.getById(registerdUserId);
        expect(getUser).not.toBeNull();
    });
});

describe('User update of existing user', () => {
    it('should return user id and updated user should be able to be accessed', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const userId = UserId.create(v4());
        const email = Email.create('teste!@teste.com');
        const name = UserName.create('teste!');
        const birthdate = new Date('1942-12-07');
        const description = UserDescription.create('teste');
        const password = 'teste';
        const user = UserProfile.create(userId, email, name, birthdate, description, password);

        await UserProfileRepository.insert(user);

        const updatedName = UserName.create('teste!!!');
        const updatedDescription = UserDescription.create('Teste description!!');
        const updatedUser = user.edit(userId, updatedName, birthdate, updatedDescription, null);
        const updatedUserId = await UserProfileRepository.update(updatedUser);

        const getUser = await UserProfileRepository.getById(updatedUserId);
        expect(getUser).not.toBeNull();
        expect(getUser?.description.description).toEqual(updatedDescription.description);
        expect(getUser?.name.name).toEqual(updatedName.name);
        expect(getUser?.birthdate).toEqual(birthdate);
    });
});

describe('Get existing user by id', () => {
    it('should return user', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const getUser = await UserProfileRepository.getById(UserId.create('b4bd9971-a838-48c5-93d6-b7b7199862b0'));

        expect(getUser).not.toBeNull();
        expect(getUser?.name.name).toEqual('user-teste');
    });
});

describe('Get non existing user by id', () => {
    it('should return null', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const getUser = await UserProfileRepository.getById(UserId.create('b4bd9979-a838-48c5-93d6-b7b7199862b0'));

        expect(getUser).toBeNull();
    });
});

describe('Get existing user by email', () => {
    it('should return user', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const getUser = await UserProfileRepository.getByEmail(Email.create('user-teste@teste.com'));

        expect(getUser).not.toBeNull();
        expect(getUser?.name.name).toEqual('user-teste');
    });
});

describe('Get non existing user by email', () => {
    it('should return null', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const getUser = await UserProfileRepository.getByEmail(Email.create('user-teste@testeteste.com'));

        expect(getUser).toBeNull();
    });
});
