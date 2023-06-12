import { Express } from 'express';
import path from 'path';
import request from 'supertest';
import { MARKERS_ROUTE } from '../../../../src/markers/MarkersRouter';
import { TestsUtils } from '../../TestsUtils';

const db = TestsUtils.getDb();
const app: Express = TestsUtils.getApp(db);
let markerId: string;

beforeAll(async () => {
    jest.setTimeout(30000);
    await TestsUtils.createTestDatabase(db);

    const agent = await TestsUtils.login(app);
    const resRegister = await agent
        .post(MARKERS_ROUTE)
        .field('status', registerMarkerBody.status)
        .field('title', registerMarkerBody.title)
        .field('description', registerMarkerBody.description)
        .field('start_date', registerMarkerBody.start_date)
        .field('end_date', registerMarkerBody.end_date)
        .field('lat', registerMarkerBody.lat)
        .field('lng', registerMarkerBody.lng)
        .attach('uploadedImages', Buffer.from(''))
        .set('Content-Type', 'multipart/form-data');

    expect(resRegister.status).toEqual(200);
    markerId = resRegister.body.data.id;
});

afterAll(async () => {
    await db.destroy();
});

const registerMarkerBody = {
    status: 'Já fui',
    title: 'Viagem',
    description: 'Muito bom',
    start_date: '2023-05-01T12:00:00.000Z',
    end_date: '2023-05-01T14:00:00.000Z',
    lat: 32,
    lng: -112.1212,
};

describe('Marker edit without login', () => {
    it('should return error', async () => {
        const resEdit = await request(app)
            .put(MARKERS_ROUTE)
            .field('markerId', markerId)
            .field('status', registerMarkerBody.status)
            .field('title', 'edited')
            .field('description', 'edit')
            .field('start_date', registerMarkerBody.start_date)
            .field('end_date', registerMarkerBody.end_date)
            .field('lat', 10.1)
            .field('lng', 10.1)
            .attach('uploadedImages', Buffer.from(''))
            .set('Content-Type', 'multipart/form-data');

        expect(resEdit.status).toEqual(403);
    });
});
