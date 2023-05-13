import { Knex } from 'knex';
import { MarkerPersistence } from '../../src/markers/marker/MarkerPersistence';
import { MARKERS_TABLE_NAME } from '../consts/DbTableNames';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex<MarkerPersistence>(MARKERS_TABLE_NAME).truncate();
    // Inserts seed entries
    return await knex<MarkerPersistence>(MARKERS_TABLE_NAME).insert([
        {
            user_id: '496a27ae-747e-4854-8c7f-06500f848964',
            id: '954545e6-a1f4-4367-b8a9-4e61ca493a56',
            status: 'Já fui',
            title: 'Teste1',
            description: 'descriptcao',
            start_date: '2023-05-01T12:00:00Z',
            end_date: '2023-05-01T14:00:00Z',
            lat: 32,
            lng: -112.1212,
        },
        {
            user_id: '4c62b323-cd8e-41d3-a10d-19e96bad063b',
            id: '0a0d2a0d-8331-46ef-9773-2442c86c0b6c',
            status: 'Já fui',
            title: 'Teste1',
            description: 'descriptcao',
            start_date: '2023-05-01T12:00:00Z',
            end_date: '2023-05-01T14:00:00Z',
            lat: 40,
            lng: -100.1212,
        },
        {
            user_id: '4c62b323-cd8e-41d3-a10d-19e96bad063b',
            id: '5104a4f4-f8cf-4b3b-8545-663c7635a693',
            status: 'Já fui',
            title: 'Teste2',
            description: 'descriptcao',
            start_date: '2023-05-01T12:00:00Z',
            end_date: '2023-05-01T14:00:00Z',
            lat: 40,
            lng: -100.1212,
        },
    ]);
}
