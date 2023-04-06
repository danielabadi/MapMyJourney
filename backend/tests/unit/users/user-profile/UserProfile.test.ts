import { v4 } from 'uuid';
import { Email } from '../../../../src/users/user-profile/Email';
import { UserDescription } from '../../../../src/users/user-profile/UserDescription';
import { UserId } from '../../../../src/users/user-profile/UserId';
import { UserName } from '../../../../src/users/user-profile/UserName';
import { UserProfile } from '../../../../src/users/user-profile/UserProfile';

describe('When creating an user profile with valid params', () => {
    it('should successfully return an user profile', async () => {
        const userId = UserId.create(v4());
        const email = Email.create('teste@teste.com');
        const name = UserName.create('teste!');
        const birthdate = new Date('1999-01-10');
        const description = UserDescription.create('teste');
        const password = 'teste';

        expect(() => UserProfile.create(userId, email, name, birthdate, description, password)).not.toThrow();
    });
});

describe('When editing an user profile with valid params and no password edit', () => {
    it('should successfully return an user profile', async () => {
        const userId = UserId.create(v4());
        const email = Email.create('teste@teste.com');
        const name = UserName.create('teste!');
        const password = 'teste';
        const oldBirthdate = new Date('1999-01-10');
        const oldDescription = UserDescription.create('');

        const user = UserProfile.create(userId, email, name, oldBirthdate, oldDescription, password);

        const otherName = UserName.create('teste!!!');
        const newBirthdate = new Date('1999-01-11');
        const newDescription = UserDescription.create('Teste');
        expect(() => user.edit(userId, otherName, newBirthdate, newDescription, null)).not.toThrow();

        const editedUser = user.edit(userId, otherName, newBirthdate, newDescription, null);

        expect(editedUser.id.id).toEqual(userId.id);
        expect(editedUser.email.email).toEqual(email.email);
        expect(editedUser.name.name).toEqual(otherName.name);
        expect(editedUser.birthdate).toEqual(newBirthdate);
        expect(editedUser.description.description).toEqual(newDescription.description);
        expect(editedUser.password).toEqual(password);
    });
});

describe('When editing an user profile with valid params and no password edit', () => {
    it('should successfully return an user profile', async () => {
        const userId = UserId.create(v4());
        const email = Email.create('teste@teste.com');
        const name = UserName.create('teste!');
        const oldPassword = 'teste';
        const oldBirthdate = new Date('1999-01-10');
        const oldDescription = UserDescription.create('');

        const user = UserProfile.create(userId, email, name, oldBirthdate, oldDescription, oldPassword);

        const otherName = UserName.create('teste!!!');
        const newBirthdate = new Date('1999-01-11');
        const newDescription = UserDescription.create('Teste');
        const newPassword = 'other';
        expect(() => user.edit(userId, otherName, newBirthdate, newDescription, newPassword)).not.toThrow();

        const editedUser = user.edit(userId, otherName, newBirthdate, newDescription, newPassword);

        expect(editedUser.id.id).toEqual(userId.id);
        expect(editedUser.email.email).toEqual(email.email);
        expect(editedUser.name.name).toEqual(otherName.name);
        expect(editedUser.birthdate).toEqual(newBirthdate);
        expect(editedUser.description.description).toEqual(newDescription.description);
        expect(editedUser.password).toEqual(newPassword);
    });
});

describe('When editing an user profile with invalid userId', () => {
    it('should throw an error', async () => {
        const userId = UserId.create(v4());
        const email = Email.create('teste@teste.com');
        const name = UserName.create('teste!');
        const oldPassword = 'teste';
        const oldBirthdate = new Date('1999-01-10');
        const oldDescription = UserDescription.create('');

        const user = UserProfile.create(userId, email, name, oldBirthdate, oldDescription, oldPassword);

        const otherUserId = UserId.create(v4());
        const otherName = UserName.create('teste!!!');
        const newBirthdate = new Date('1999-01-11');
        const newDescription = UserDescription.create('Teste');
        const newPassword = 'other';
        expect(() => user.edit(otherUserId, otherName, newBirthdate, newDescription, newPassword)).toThrow();
    });
});
