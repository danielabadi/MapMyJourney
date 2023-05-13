import { Express } from 'express';
import path from 'path';
import request from 'supertest';
import { MARKERS_ROUTE } from '../../../../src/markers/MarkersRouter';
import { TestsUtils } from '../../TestsUtils';

const db = TestsUtils.getDb();
const app: Express = TestsUtils.getApp(db);

beforeAll(async () => {
    jest.setTimeout(30000);
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

const registerMarkerBody = {
    status: 'Já fui',
    title: 'Viagem',
    description: 'Muito bom',
    start_date: '2023-05-01T12:00:00Z',
    end_date: '2023-05-01T14:00:00Z',
    lat: 32,
    lng: -112.1212,
};

describe('Marker registration without login', () => {
    it('should return error', async () => {
        const res = await request(app)
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
        expect(res.status).toEqual(403);
    });
});

describe('Marker registration with login and no photos', () => {
    it('should return success', async () => {
        const agent = await TestsUtils.login(app);
        const res = await agent
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
        expect(res.status).toEqual(200);
        expect(res.body.data.id).not.toBeNull();
    });
});

describe('Marker registration with login and with photos', () => {
    const filePath = path.join(__dirname, 'test.png');

    it('should return success when uploading one photo', async () => {
        const agent = await TestsUtils.login(app);

        const res = await agent
            .post(MARKERS_ROUTE)
            .field('status', registerMarkerBody.status)
            .field('title', registerMarkerBody.title)
            .field('description', registerMarkerBody.description)
            .field('start_date', registerMarkerBody.start_date)
            .field('end_date', registerMarkerBody.end_date)
            .field('lat', registerMarkerBody.lat)
            .field('lng', registerMarkerBody.lng)
            .attach('uploadedImages', filePath)
            .set('Content-Type', 'multipart/form-data');

        expect(res.status).toEqual(200);
        expect(res.body.data.id).not.toBeNull();
    });

    it('should return success when uploading multiple photos (less than 5)', async () => {
        const agent = await TestsUtils.login(app);
        const res = await agent
            .post(MARKERS_ROUTE)
            .field('status', registerMarkerBody.status)
            .field('title', registerMarkerBody.title)
            .field('description', registerMarkerBody.description)
            .field('start_date', registerMarkerBody.start_date)
            .field('end_date', registerMarkerBody.end_date)
            .field('lat', registerMarkerBody.lat)
            .field('lng', registerMarkerBody.lng)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .set('Content-Type', 'multipart/form-data');

        expect(res.status).toEqual(200);
        expect(res.body.data.id).not.toBeNull();
    });

    it('should return error when uploading more than 5 photos', async () => {
        const agent = await TestsUtils.login(app);
        const res = await agent
            .post(MARKERS_ROUTE)
            .field('status', registerMarkerBody.status)
            .field('title', registerMarkerBody.title)
            .field('description', registerMarkerBody.description)
            .field('start_date', registerMarkerBody.start_date)
            .field('end_date', registerMarkerBody.end_date)
            .field('lat', registerMarkerBody.lat)
            .field('lng', registerMarkerBody.lng)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .attach('uploadedImages', filePath)
            .set('Content-Type', 'multipart/form-data');

        expect(res.status).toEqual(500);
    });
});
