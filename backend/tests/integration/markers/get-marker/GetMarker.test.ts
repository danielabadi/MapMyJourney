import { Express } from 'express';
import request from 'supertest';
import { MARKERS_ROUTE } from '../../../../src/markers/MarkersRouter';
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

describe('Get markers without login', () => {
    it('should return error', async () => {
        const res = await request(app).get(MARKERS_ROUTE);
        expect(res.status).toEqual(403);
    });
});

describe('Get markers with login and no markers', () => {
    it('should return success', async () => {
        const agent = await TestsUtils.login(app);

        const res = await agent.get(MARKERS_ROUTE);
        expect(res.status).toEqual(200);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data.length).toEqual(0);
    });
});
describe('Get markers with login and 1 marker, marker with no photo', () => {
    it('should return success', async () => {
        const loginBody: LoginRequest = { email: 'user-teste2@teste.com', password: 'user-teste' };
        const agent = await TestsUtils.loginCustom(app, loginBody);

        const res = await agent.get(MARKERS_ROUTE);
        expect(res.status).toEqual(200);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data.length).toEqual(1);
        expect(res.body.data[0]).toStrictEqual({
            userId: '496a27ae-747e-4854-8c7f-06500f848964',
            id: '954545e6-a1f4-4367-b8a9-4e61ca493a56',
            status: 'Já fui',
            title: 'Teste1',
            description: 'descriptcao',
            start_date: '2023-05-01T12:00:00.000Z',
            end_date: '2023-05-01T14:00:00.000Z',
            lat: 32,
            lng: -112.1212,
            photos: [],
        });
    });
});

describe('Get markers with login and 2 markers, one marker with 1 photo and other with 2 photos', () => {
    it('should return success', async () => {
        const loginBody: LoginRequest = { email: 'user-teste3@teste.com', password: 'user-teste' };
        const agent = await TestsUtils.loginCustom(app, loginBody);

        const res = await agent.get(MARKERS_ROUTE);
        expect(res.status).toEqual(200);
        expect(res.body.data).not.toBeNull();
        expect(res.body.data.length).toEqual(2);
        expect(res.body.data[0]).toStrictEqual({
            userId: '4c62b323-cd8e-41d3-a10d-19e96bad063b',
            id: '0a0d2a0d-8331-46ef-9773-2442c86c0b6c',
            status: 'Já fui',
            title: 'Teste1',
            description: 'descriptcao',
            start_date: '2023-05-01T12:00:00.000Z',
            end_date: '2023-05-01T14:00:00.000Z',
            lat: 40,
            lng: -100.1212,
            photos: ['test1.png'],
        });

        expect(res.body.data[1]).toStrictEqual({
            userId: '4c62b323-cd8e-41d3-a10d-19e96bad063b',
            id: '5104a4f4-f8cf-4b3b-8545-663c7635a693',
            status: 'Já fui',
            title: 'Teste2',
            description: 'descriptcao',
            start_date: '2023-05-01T12:00:00.000Z',
            end_date: '2023-05-01T14:00:00.000Z',
            lat: 40,
            lng: -100.1212,
            photos: ['test2.png', 'test3.png'],
        });
    });
});
