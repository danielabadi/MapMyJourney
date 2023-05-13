import { MarkerTitle } from '../../../src/markers/marker/MarkerTitle';

describe('When creating a marker title with less than 50 characters', () => {
    it('should successfully return a marker title instance', async () => {
        const title = 'teste';
        expect(() => MarkerTitle.create(title)).not.toThrow();
        expect(MarkerTitle.create(title).title).toEqual(title);
    });
});

describe('When creating a marker title with more than 50 characters', () => {
    it('should return an error', async () => {
        const title = 'testeTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste';
        expect(() => MarkerTitle.create(title)).toThrow();
    });
});
