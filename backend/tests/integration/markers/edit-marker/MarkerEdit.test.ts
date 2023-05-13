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

describe('Marker edit with login and adding photos', () => {
    const editFilePath = path.join(__dirname, 'test2.png');

    it('should return success', async () => {
        const agent = await TestsUtils.login(app);
        const resEdit = await agent
            .put(MARKERS_ROUTE)
            .field('markerId', markerId)
            .field('status', registerMarkerBody.status)
            .field('title', 'edited')
            .field('description', 'edit')
            .field('start_date', registerMarkerBody.start_date)
            .field('end_date', '2023-05-02T14:00:00Z')
            .field('lat', 10.1)
            .field('lng', 10.1)
            .attach('uploadedImages', editFilePath)
            .attach('uploadedImages', editFilePath)
            .attach('uploadedImages', editFilePath)
            .set('Content-Type', 'multipart/form-data');
        expect(resEdit.status).toEqual(200);

        const resGetAfterEdit = await agent.get(MARKERS_ROUTE);
        expect(resGetAfterEdit.status).toEqual(200);
        expect(resGetAfterEdit.body.data).not.toBeNull();
        expect(resGetAfterEdit.body.data[0]).toMatchObject({
            userId: 'b4bd9971-a838-48c5-93d6-b7b7199862b0',
            id: markerId,
            status: 'Já fui',
            title: 'edited',
            description: 'edit',
            start_date: registerMarkerBody.start_date,
            end_date: '2023-05-02T14:00:00.000Z',
            lat: 10.1,
            lng: 10.1,
        });
        expect(resGetAfterEdit.body.data[0].photos.length).toEqual(3);
    });
});

describe('Marker edit with login and replacing photos', () => {
    const registerFilePath = path.join(__dirname, 'test1.png');
    const editFilePath = path.join(__dirname, 'test2.png');

    it('should return success', async () => {
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
            .attach('uploadedImages', registerFilePath)
            .set('Content-Type', 'multipart/form-data');

        expect(resRegister.status).toEqual(200);
        const newMarkerId: string = resRegister.body.data.id;

        const resGetBeforeEdit = await agent.get(MARKERS_ROUTE);
        expect(resGetBeforeEdit.status).toEqual(200);
        expect(resGetBeforeEdit.body.data).not.toBeNull();
        expect(resGetBeforeEdit.body.data.length).toEqual(2);
        expect(resGetBeforeEdit.body.data[1]).toMatchObject({
            userId: 'b4bd9971-a838-48c5-93d6-b7b7199862b0',
            id: newMarkerId,
            status: registerMarkerBody.status,
            title: registerMarkerBody.title,
            description: registerMarkerBody.description,
            start_date: registerMarkerBody.start_date,
            end_date: registerMarkerBody.end_date,
            lat: registerMarkerBody.lat,
            lng: registerMarkerBody.lng,
        });
        expect(resGetBeforeEdit.body.data[1].photos.length).toEqual(1);

        const resEdit = await agent
            .put(MARKERS_ROUTE)
            .field('markerId', newMarkerId)
            .field('status', registerMarkerBody.status)
            .field('title', 'edited')
            .field('description', 'edit')
            .field('start_date', registerMarkerBody.start_date)
            .field('end_date', '2023-05-02T14:00:00Z')
            .field('lat', 10.1)
            .field('lng', 10.1)
            .attach('uploadedImages', editFilePath)
            .attach('uploadedImages', editFilePath)
            .set('Content-Type', 'multipart/form-data');
        expect(resEdit.status).toEqual(200);

        const resGetAfterEdit = await agent.get(MARKERS_ROUTE);
        expect(resGetAfterEdit.status).toEqual(200);
        expect(resGetAfterEdit.body.data).not.toBeNull();
        expect(resGetAfterEdit.body.data.length).toEqual(2);
        expect(resGetAfterEdit.body.data[1]).toMatchObject({
            userId: 'b4bd9971-a838-48c5-93d6-b7b7199862b0',
            id: newMarkerId,
            status: 'Já fui',
            title: 'edited',
            description: 'edit',
            start_date: registerMarkerBody.start_date,
            end_date: '2023-05-02T14:00:00.000Z',
            lat: 10.1,
            lng: 10.1,
        });
        expect(resGetAfterEdit.body.data[1].photos.length).toEqual(2);
    });
});
