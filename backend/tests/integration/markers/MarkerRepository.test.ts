import path from 'path';
import { v4 } from 'uuid';
import { MARKERS_TABLE_NAME, PHOTOS_TABLE_NAME } from '../../../database/consts/DbTableNames';
import { PhotoUploadConfig } from '../../../src/common/FileSystemConfig';
import { Marker } from '../../../src/markers/marker/Marker';
import { MarkerId } from '../../../src/markers/marker/MarkerId';
import { MarkerPhoto } from '../../../src/markers/marker/MarkerPhoto';
import { MarkerPosition } from '../../../src/markers/marker/MarkerPosition';
import { MarkerRepository, SQLMarkerRepository } from '../../../src/markers/marker/MarkerRepository';
import { MarkerStatus } from '../../../src/markers/marker/MarkerStatus';
import { MarkerTitle } from '../../../src/markers/marker/MarkerTitle';
import { Email } from '../../../src/users/user-profile/Email';
import { UserDescription } from '../../../src/users/user-profile/UserDescription';
import { UserId } from '../../../src/users/user-profile/UserId';
import { UserName } from '../../../src/users/user-profile/UserName';
import { UserProfile } from '../../../src/users/user-profile/UserProfile';
import { TestsUtils, registerUser } from '../TestsUtils';

const db = TestsUtils.getDb();
const fileSystemConfig = new PhotoUploadConfig(path.join(process.cwd(), '/tests-uploads/'));

beforeAll(async () => {
    await TestsUtils.createTestDatabase(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('Marker after registration', () => {
    const markerRepository: MarkerRepository = new SQLMarkerRepository(
        db,
        fileSystemConfig,
        MARKERS_TABLE_NAME,
        PHOTOS_TABLE_NAME,
    );

    it('should be able to be accessed by id', async () => {
        const userId = await registerUser(
            db,
            UserProfile.create(
                UserId.create(v4()),
                Email.create('teste1@teste.com'),
                UserName.create('Teste1'),
                new Date('1999-03-03'),
                UserDescription.create('description'),
                'password',
            ),
        );
        const markerToBeRegistered = Marker.create(
            userId,
            MarkerId.create(v4()),
            MarkerStatus.create('Já fui'),
            MarkerTitle.create('Teste'),
            'descriptcao',
            new Date('2023-05-01T12:00:00Z'),
            new Date('2023-05-01T14:00:00Z'),
            MarkerPosition.create(32, -112.1212),
            [MarkerPhoto.create('teste'), MarkerPhoto.create('teste2')],
        );
        const registeredMarkerId = await markerRepository.insert(markerToBeRegistered);

        const registeredMarker = await markerRepository.getById(registeredMarkerId);

        expect(registeredMarker).not.toBeNull();
        expect(registeredMarker?.title.title).toEqual('Teste');
        expect(registeredMarker?.photos).not.toBeNull();
        expect(registeredMarker?.photos.length).toEqual(2);
        expect(registeredMarker?.photos[0]?.filename).toEqual('teste');
        expect(registeredMarker?.photos[1]?.filename).toEqual('teste2');
    });

    it('should be able to be accessed by user id', async () => {
        const userId = await registerUser(
            db,
            UserProfile.create(
                UserId.create(v4()),
                Email.create('teste2@teste.com'),
                UserName.create('Teste2'),
                new Date('1999-03-03'),
                UserDescription.create('description2'),
                'password',
            ),
        );
        const markerToBeRegisteredFirst = Marker.create(
            userId,
            MarkerId.create(v4()),
            MarkerStatus.create('Já fui'),
            MarkerTitle.create('Teste'),
            'descriptcao',
            new Date('2023-05-01T12:00:00Z'),
            new Date('2023-05-01T14:00:00Z'),
            MarkerPosition.create(32, -112.1212),
            [MarkerPhoto.create('teste3'), MarkerPhoto.create('teste4')],
        );
        await markerRepository.insert(markerToBeRegisteredFirst);

        const markerToBeRegisteredSecond = Marker.create(
            userId,
            MarkerId.create(v4()),
            MarkerStatus.create('Já fui'),
            MarkerTitle.create('Teste2'),
            'descriptcao',
            new Date('2023-05-01T12:00:00Z'),
            new Date('2023-05-01T14:00:00Z'),
            MarkerPosition.create(11, -33.1212),
            [MarkerPhoto.create('teste5'), MarkerPhoto.create('teste6'), MarkerPhoto.create('teste7')],
        );
        await markerRepository.insert(markerToBeRegisteredSecond);

        const registeredMarkers = await markerRepository.getByUserId(userId);

        expect(registeredMarkers).not.toBeNull();
        expect(registeredMarkers?.length).toEqual(2);

        const firstRegistered = registeredMarkers![0];
        expect(firstRegistered?.title.title).toEqual('Teste');
        expect(firstRegistered?.photos).not.toBeNull();
        expect(firstRegistered?.photos.length).toEqual(2);
        expect(firstRegistered?.photos[0]?.filename).toEqual('teste3');
        expect(firstRegistered?.photos[1]?.filename).toEqual('teste4');

        const secondRegistered = registeredMarkers![1];
        expect(secondRegistered?.title.title).toEqual('Teste2');
        expect(secondRegistered?.photos).not.toBeNull();
        expect(secondRegistered?.photos.length).toEqual(3);
        expect(secondRegistered?.photos[0]?.filename).toEqual('teste5');
        expect(secondRegistered?.photos[1]?.filename).toEqual('teste6');
        expect(secondRegistered?.photos[2]?.filename).toEqual('teste7');
    });
});
