import { Knex } from 'knex';
import { BcryptHashService, HashService } from '../../src/users/hash-service/HashService';
import { UserProfilePersistence } from '../../src/users/user-profile/UserProfilePersistence';
import { USERS_TABLE_NAME } from '../consts/DbTableNames';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex<UserProfilePersistence>(USERS_TABLE_NAME).truncate();
    const hashService: HashService = new BcryptHashService();
    // Inserts seed entries
    return await knex<UserProfilePersistence>(USERS_TABLE_NAME).insert([
        {
            id: 'b4bd9971-a838-48c5-93d6-b7b7199862b0',
            email: 'user-teste@teste.com',
            name: 'user-teste',
            birthdate: '1993-03-01T00:00:00.000Z',
            description: 'Teste',
            password: await hashService.hashPassword('user-teste'),
        },
        {
            id: '496a27ae-747e-4854-8c7f-06500f848964',
            email: 'user-teste2@teste.com',
            name: 'user-teste2',
            birthdate: '1998-12-05T00:00:00.000Z',
            password: await hashService.hashPassword('user-teste'),
        },
        {
            id: '4c62b323-cd8e-41d3-a10d-19e96bad063b',
            email: 'user-teste3@teste.com',
            name: 'user-teste3',
            birthdate: '1991-09-12T00:00:00.000Z',
            password: await hashService.hashPassword('user-teste'),
        },
    ]);
}
