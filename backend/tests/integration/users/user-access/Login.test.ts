import { Express } from 'express';
import request from 'supertest';
import { LOGIN_ROUTE } from '../../../../src/users/UsersRouter';
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

describe('Login while already logged in', () => {
    it('should return error', async () => {
        const agent = await TestsUtils.login(app);
        const body: LoginRequest = { email: 'user-teste@teste.com', password: 'user-teste' };
        const res = await agent.post(LOGIN_ROUTE).send(body);
        expect(res.status).toEqual(403);
    });
});

describe('Login by valid email and valid password', () => {
    it('should return an http 200 and success message', async () => {
        const body: LoginRequest = { email: 'user-teste@teste.com', password: 'user-teste' };
        const res = await request(app).post(LOGIN_ROUTE).send(body);
        expect(res.status).toEqual(200);
        expect(res.body).toStrictEqual({ success: true, data: null });
    });
});

describe('Login by valid email and invalid password', () => {
    it('should return an http 400 and error message', async () => {
        const body: LoginRequest = { email: 'user-teste@teste.com', password: 'user-teste1' };
        const res = await request(app).post(LOGIN_ROUTE).send(body);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({ success: false, errors: ['Email ou senha inválidos'] });
    });
});

describe('Login by invalid email and valid password', () => {
    it(`should return an http 400 and error message`, async () => {
        const body: LoginRequest = { email: 'user-testee@teste.com', password: 'user-teste' };
        const res = await request(app).post(LOGIN_ROUTE).send(body);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({ success: false, errors: ['Email ou senha inválidos'] });
    });
});

describe('Login by invalid email and invalid password', () => {
    it('should return an http 400 and error message', async () => {
        const body: LoginRequest = { email: 'user-testee@teste.com', password: 'user-teste1' };
        const res = await request(app).post(LOGIN_ROUTE).send(body);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({ success: false, errors: ['Email ou senha inválidos'] });
    });
});

describe('Login without sending email or password', () => {
    it('should return an http 400 and error messages', async () => {
        const body = {};
        const res = await request(app).post(LOGIN_ROUTE).send(body);
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({
            success: false,
            errors: [
                { location: 'body', msg: 'O campo email é obrigatório', param: 'email' },
                { location: 'body', msg: 'O campo senha é obrigatório', param: 'password' },
            ],
        });
    });
});
