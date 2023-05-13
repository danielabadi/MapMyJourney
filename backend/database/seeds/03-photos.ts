import { Knex } from 'knex';
import { MarkerPhotoPersistence } from '../../src/markers/marker/MarkerPhotoPersistence';
import { PHOTOS_TABLE_NAME } from '../consts/DbTableNames';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex<MarkerPhotoPersistence>(PHOTOS_TABLE_NAME).truncate();
    // Inserts seed entries
    return await knex<MarkerPhotoPersistence>(PHOTOS_TABLE_NAME).insert([
        {
            marker_id: '0a0d2a0d-8331-46ef-9773-2442c86c0b6c',
            filename: 'test1.png',
        },
        {
            marker_id: '5104a4f4-f8cf-4b3b-8545-663c7635a693',
            filename: 'test2.png',
        },
        {
            marker_id: '5104a4f4-f8cf-4b3b-8545-663c7635a693',
            filename: 'test3.png',
        },
    ]);
}
