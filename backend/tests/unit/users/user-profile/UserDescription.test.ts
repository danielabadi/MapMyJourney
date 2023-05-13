import { UserDescription } from '../../../../src/users/user-profile/UserDescription';

describe('When creating a null user description', () => {
    it('should successfully return an user description instance', async () => {
        const description = null;
        expect(() => UserDescription.create(description)).not.toThrow();
        expect(UserDescription.create(description).description).toEqual(description);
    });
});

describe('When creating an empty user description', () => {
    it('should successfully return an user description instance', async () => {
        const description = '';
        expect(() => UserDescription.create(description)).not.toThrow();
        expect(UserDescription.create(description).description).toEqual(description);
    });
});

describe('When creating an user description with less than 500 characters', () => {
    it('should successfully return an user description instance', async () => {
        const description = 'teste';
        expect(() => UserDescription.create(description)).not.toThrow();
        expect(UserDescription.create(description).description).toEqual(description);
    });
});

describe('When creating an user description with more than 500 characters', () => {
    it('should return an error', async () => {
        const longDescription =
            'jmtH2MQDrPQzNR8Y92T92SibzACK27Qa5risuLaGkFmyawEm2RvejSf4YXBB34Hvo3a20rRn7FaZHxtu8Ysnv9YRGvfb1tyi39GHCZC2gsXUu1TQFTNTffwOQMoeWQuY2IUuJd19r5ZiqxurJtzyGZH07rwAjCGPGSZpYgM23Mbs26SKltSDiMozkNaMqnzxkSEHT9bEbIIuu5oiYtNjxl0PpORoakesevYvjPNKgMiVoja7qIRmQPf4cI68yeIaobAPfKooIP2DcuKGIFaU2vJVGfkBCJyr7cfNYexqL9USguQhiwcrHlkFtIazVq8PZm5uRNs9yjxhGFG1PoGdPd2LTCWfAkhC6HFrEhm5k5LnVZZ6Sy37Ub0G7B8zEJVXB2fKfFlX5sPEMC9d8FujZnDXZtbLGdG3Nc7LgNWxXorr01hPy2Ntx183Bh6AmVHp90FHxVJkwDPiZ8S65KfTacGVGsfc5708DBWSbbkn7DewMIjObzEG';
        expect(() => UserDescription.create(longDescription)).toThrow();
    });
});
