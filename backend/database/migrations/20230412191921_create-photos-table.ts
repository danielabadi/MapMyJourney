import { Knex } from 'knex';
import { MARKERS_TABLE_NAME, PHOTOS_TABLE_NAME } from '../consts/DbTableNames';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(PHOTOS_TABLE_NAME, (table) => {
        table.string('filename').primary();
        table.string('marker_id').references('id').inTable(MARKERS_TABLE_NAME).notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(PHOTOS_TABLE_NAME);
}
