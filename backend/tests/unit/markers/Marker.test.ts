import { v4 } from 'uuid';
import { Marker } from '../../../src/markers/marker/Marker';
import { MarkerId } from '../../../src/markers/marker/MarkerId';
import { MarkerPhoto } from '../../../src/markers/marker/MarkerPhoto';
import { MarkerPosition } from '../../../src/markers/marker/MarkerPosition';
import { MarkerStatus } from '../../../src/markers/marker/MarkerStatus';
import { MarkerTitle } from '../../../src/markers/marker/MarkerTitle';
import { UserId } from '../../../src/users/user-profile/UserId';

describe('When creating a marker with valid params', () => {
    it('should successfully return a marker', async () => {
        const userId = UserId.create(v4());
        const markerId = MarkerId.create(v4());
        const status = MarkerStatus.create('JF');
        const title = MarkerTitle.create('Teste');
        const description = 'teste';
        const start_date = new Date('1992-03-22');
        const end_date = new Date('1992-03-29');
        const position = MarkerPosition.create(10, 10);
        const photos = [MarkerPhoto.create('teste.png')];

        expect(() =>
            Marker.create(userId, markerId, status, title, description, start_date, end_date, position, photos),
        ).not.toThrow();
    });
});

describe('When creating a marker with invalid params, invalid number of photos', () => {
    it('should return an error', async () => {
        const userId = UserId.create(v4());
        const markerId = MarkerId.create(v4());
        const status = MarkerStatus.create('JF');
        const title = MarkerTitle.create('Teste');
        const description = 'teste';
        const start_date = new Date('1992-03-22');
        const end_date = new Date('1992-03-29');
        const position = MarkerPosition.create(10, 10);
        const photos = [
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
        ];

        expect(() =>
            Marker.create(userId, markerId, status, title, description, start_date, end_date, position, photos),
        ).toThrow();
    });
});

describe('When editing a marker with valid params', () => {
    it('should successfully return a marker', async () => {
        const userId = UserId.create(v4());
        const markerId = MarkerId.create(v4());
        const status = MarkerStatus.create('JF');
        const title = MarkerTitle.create('Teste');
        const description = 'teste';
        const start_date = new Date('1992-03-22');
        const end_date = new Date('1992-03-29');
        const position = MarkerPosition.create(10, 10);
        const photos = [
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
        ];
        const marker = Marker.create(
            userId,
            markerId,
            status,
            title,
            description,
            start_date,
            end_date,
            position,
            photos,
        );

        expect(() =>
            marker.edit(userId, markerId, status, title, description, start_date, end_date, position, photos),
        ).not.toThrow();
    });
});

describe('When editing a marker with invalid params, userId not same', () => {
    it('should successfully return a marker', async () => {
        const userId = UserId.create(v4());
        const markerId = MarkerId.create(v4());
        const status = MarkerStatus.create('JF');
        const title = MarkerTitle.create('Teste');
        const description = 'teste';
        const start_date = new Date('1992-03-22');
        const end_date = new Date('1992-03-29');
        const position = MarkerPosition.create(10, 10);
        const photos = [
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
        ];
        const marker = Marker.create(
            userId,
            markerId,
            status,
            title,
            description,
            start_date,
            end_date,
            position,
            photos,
        );

        expect(() =>
            marker.edit(
                UserId.create(v4()),
                markerId,
                status,
                title,
                description,
                start_date,
                end_date,
                position,
                photos,
            ),
        ).toThrow();
    });
});

describe('When editing a marker with invalid params, userId not same', () => {
    it('should successfully return a marker', async () => {
        const userId = UserId.create(v4());
        const markerId = MarkerId.create(v4());
        const status = MarkerStatus.create('JF');
        const title = MarkerTitle.create('Teste');
        const description = 'teste';
        const start_date = new Date('1992-03-22');
        const end_date = new Date('1992-03-29');
        const position = MarkerPosition.create(10, 10);
        const photos = [
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
            MarkerPhoto.create('teste.png'),
        ];
        const marker = Marker.create(
            userId,
            markerId,
            status,
            title,
            description,
            start_date,
            end_date,
            position,
            photos,
        );
        photos.push(MarkerPhoto.create('teste.png'));
        expect(() =>
            marker.edit(userId, markerId, status, title, description, start_date, end_date, position, photos),
        ).toThrow();
    });
});
