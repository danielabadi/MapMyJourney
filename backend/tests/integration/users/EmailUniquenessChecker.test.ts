import { USERS_TABLE_NAME } from '../../../database/consts/DbTableNames';
import { Email } from '../../../src/users/user-profile/Email';
import { EmailUniquenessChecker } from '../../../src/users/user-profile/EmailUniquenessChecker';
import { SQLUserProfileRepository } from '../../../src/users/user-profile/UserProfileRepository';
import { TestsUtils } from '../TestsUtils';

const db = TestsUtils.getDb();
beforeAll(async () => {
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('Email uniqueness check for email that exists', () => {
    it('should return true', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const emailUniquenessChecker = new EmailUniquenessChecker(UserProfileRepository);

        expect(await emailUniquenessChecker.emailExists(Email.create('user-teste@teste.com'))).toBe(true);
    });
});

describe('Email uniqueness check for email that does not exist', () => {
    it('should return false', async () => {
        const UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const emailUniquenessChecker = new EmailUniquenessChecker(UserProfileRepository);

        expect(await emailUniquenessChecker.emailExists(Email.create('teste@testeteste.com'))).toBe(false);
    });
});
