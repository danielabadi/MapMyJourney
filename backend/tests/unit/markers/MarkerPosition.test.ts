import { MarkerPosition } from '../../../src/markers/marker/MarkerPosition';

describe('When creating a valid marker position', () => {
    it('should successfully return a marker position instance', async () => {
        const lat = 10;
        const lon = 10;
        expect(() => MarkerPosition.create(lat, lon)).not.toThrow();
        expect(MarkerPosition.create(lat, lon).lat).toEqual(lat);
        expect(MarkerPosition.create(lat, lon).lng).toEqual(lon);
    });
});

describe('When creating a invalid marker position with invalid latitude', () => {
    it('should successfully return a marker position instance', async () => {
        const lat = -91;
        const lon = 10;
        expect(() => MarkerPosition.create(lat, lon)).toThrow();
    });
});

describe('When creating a invalid marker position with invalid longitude', () => {
    it('should successfully return a marker position instance', async () => {
        const lat = 10;
        const lon = 181;
        expect(() => MarkerPosition.create(lat, lon)).toThrow();
    });
});

describe('When creating a invalid marker position with invalid longitude and latitude', () => {
    it('should successfully return a marker position instance', async () => {
        const lat = 92;
        const lon = 181;
        expect(() => MarkerPosition.create(lat, lon)).toThrow();
    });
});
