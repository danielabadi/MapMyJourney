import { MarkerStatus } from '../../../src/markers/marker/MarkerStatus';

describe('When creating a marker status', () => {
    it('should successfully return a marker status instance', async () => {
        const status = 'teste';
        expect(() => MarkerStatus.create(status)).not.toThrow();
        expect(MarkerStatus.create(status).status).toEqual(status);
    });
});
