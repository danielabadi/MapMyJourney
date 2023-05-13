import { v4 } from 'uuid';
import { MarkerId } from '../../../src/markers/marker/MarkerId';

describe('When creating a valid marker id with uuid', () => {
    it('should successfully return an marker id instance', async () => {
        const uuid = v4();
        expect(() => MarkerId.create(uuid)).not.toThrow();
        expect(MarkerId.create(uuid).id).toEqual(uuid);
    });
});

describe('When creating an invalid marker id', () => {
    it('should return an error', async () => {
        expect(() => MarkerId.create('teste')).toThrow();
    });
});
