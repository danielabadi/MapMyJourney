import { Express } from 'express';
import request from 'supertest';
import { USERS_ROUTE } from '../../../../src/users/UsersRouter';
import { RegisterUserRequest } from '../../../../src/users/register-user/RegisterUserRequest';
import { TestsUtils } from '../../TestsUtils';

const db = TestsUtils.getDb();
const app: Express = TestsUtils.getApp(db);

beforeAll(async () => {
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('User registration with already login', () => {
    it('should return error', async () => {
        const agent = await TestsUtils.login(app);
        const registerUserBody: RegisterUserRequest = {
            email: 'email@email.com',
            name: 'userName',
            birthdate: '1984-09-11',
            password: 'password',
            confirmPassword: 'password',
        };
        const res = await agent.post(USERS_ROUTE).send(registerUserBody);
        expect(res.status).toEqual(403);
    });
});

describe('User registration with valid email and password', () => {
    it('should return ok', async () => {
        const registerUserBody: RegisterUserRequest = {
            email: 'email@email.com',
            name: 'userName',
            birthdate: '1984-09-11',
            password: 'password',
            confirmPassword: 'password',
        };
        const res = await request(app).post(USERS_ROUTE).send(registerUserBody);
        expect(res.status).toEqual(200);
        expect(res.body.data.id).not.toBeNull();
    });
});

describe('User registration with already registered email', () => {
    it('should return error', async () => {
        const registerUserBody: RegisterUserRequest = {
            email: 'user-teste@teste.com',
            name: 'userName',
            birthdate: '1984-09-11',
            password: 'password',
            confirmPassword: 'password',
        };
        const res = await request(app).post(USERS_ROUTE).send(registerUserBody);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({
            success: false,
            errors: ['Já existe um usuário cadastrado com esse email'],
        });
    });
});

describe('User registration with invalid params', () => {
    it('should return error', async () => {
        const registerUserBody: RegisterUserRequest = {
            email: 'user-teste',
            name: 'user',
            birthdate: 'test',
            password: 'password',
            confirmPassword: 'password1',
        };
        const res = await request(app).post(USERS_ROUTE).send(registerUserBody);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({
            success: false,
            errors: [
                { location: 'body', param: 'email', value: 'user-teste', msg: 'Deve ser inserido um email válido' },
                { location: 'body', param: 'name', value: 'user', msg: 'Nome deve ter no minimo 5 caracteres' },
                {
                    location: 'body',
                    param: 'birthdate',
                    value: 'test',
                    msg: 'O campo data de nascimento deve ser uma data',
                },
                { location: 'body', param: 'confirmPassword', value: 'password1', msg: 'Senhas não são iguais' },
            ],
        });
    });
});
