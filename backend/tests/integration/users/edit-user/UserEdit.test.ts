import { Express } from 'express';
import request from 'supertest';
import { USERS_ROUTE } from '../../../../src/users/UsersRouter';
import { EditUserRequest } from '../../../../src/users/edit-user/EditUserRequest';
import { LoginRequest } from '../../../../src/users/user-access/login/LoginRequest';
import { TestsUtils } from '../../TestsUtils';

const db = TestsUtils.getDb();
const app: Express = TestsUtils.getApp(db);

beforeAll(async () => {
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('User edit without login', () => {
    it('should return error', async () => {
        const editUserBody: EditUserRequest = {
            name: 'userName',
            description: 'description',
            birthdate: '1984-09-11',
            password: 'password',
            confirmPassword: 'password',
        };
        const res = await request(app).put(USERS_ROUTE).send(editUserBody);
        expect(res.status).toEqual(403);
    });
});

describe('User edit with login, changing valid name, birthdate and description, sending correct password and doing no new password edit', () => {
    it('should return ok', async () => {
        const agent = await TestsUtils.login(app);
        const editUserBody: EditUserRequest = {
            name: 'userName',
            birthdate: '1992-03-01',
            description: 'description',
            password: 'user-teste',
            confirmPassword: 'user-teste',
        };
        const res = await agent.put(USERS_ROUTE).send(editUserBody);
        expect(res.status).toEqual(200);
        expect(res.body.data.id).not.toBeNull();
    });
});

describe('User edit with login, changing valid name, birthdate and description, sending correct password and doing new password edit', () => {
    it('should return ok', async () => {
        const agent = await TestsUtils.login(app);
        const editUserBody: EditUserRequest = {
            name: 'userName',
            description: 'description',
            birthdate: '1991-03-01',
            password: 'user-teste',
            confirmPassword: 'user-teste',
            newPassword: 'newPass',
        };
        const res = await agent.put(USERS_ROUTE).send(editUserBody);
        expect(res.status).toEqual(200);
        expect(res.body.data.id).not.toBeNull();
    });
});

describe('User edit with invalid params', () => {
    it('should return error', async () => {
        const loginRequest: LoginRequest = { email: 'user-teste@teste.com', password: 'newPass' };
        const agent = await TestsUtils.loginCustom(app, loginRequest);
        const editUserBody: EditUserRequest = {
            name: 'user',
            description: 'null',
            password: 'user-teste',
            birthdate: 'test',
            confirmPassword: 'user-test',
            newPassword: 'newP',
        };
        const res = await agent.put(USERS_ROUTE).send(editUserBody);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({
            success: false,
            errors: [
                { location: 'body', param: 'name', value: 'user', msg: 'Nome deve ter no minimo 5 caracteres' },
                {
                    location: 'body',
                    param: 'birthdate',
                    value: 'test',
                    msg: 'O campo data de nascimento deve ser uma data',
                },
                { location: 'body', param: 'confirmPassword', value: 'user-test', msg: 'Senhas não são iguais' },
                {
                    location: 'body',
                    param: 'newPassword',
                    value: 'newP',
                    msg: 'Nova senha deve ter no minimo 5 caracteres',
                },
            ],
        });
    });
});
