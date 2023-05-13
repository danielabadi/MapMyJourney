import { MarkerPhoto } from '../../../src/markers/marker/MarkerPhoto';

describe('When creating a valid marker photo', () => {
    it('should successfully return a marker photo instance', async () => {
        const filename = 'teste';
        expect(() => MarkerPhoto.create(filename)).not.toThrow();
        expect(MarkerPhoto.create(filename).filename).toEqual(filename);
    });
});
