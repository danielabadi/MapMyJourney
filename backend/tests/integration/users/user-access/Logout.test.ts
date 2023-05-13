import { Express } from 'express';
import request from 'supertest';
import { LOGOUT_ROUTE } from '../../../../src/users/UsersRouter';
import { TestsUtils } from '../../TestsUtils';

const db = TestsUtils.getDb();
const app: Express = TestsUtils.getApp(db);

beforeAll(async () => {
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('Logout after login', () => {
    it('should return ok', async () => {
        const agent: request.SuperAgentTest = await TestsUtils.login(app);
        const res = await agent.post(LOGOUT_ROUTE);
        expect(res.status).toEqual(200);
    });
});

describe('Logout without login', () => {
    it('should return error', async () => {
        const res = await request(app).post(LOGOUT_ROUTE);
        expect(res.status).toEqual(403);
    });
});
