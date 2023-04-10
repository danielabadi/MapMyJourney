import { Knex } from 'knex';
import { MARKERS_TABLE_NAME, USERS_TABLE_NAME } from '../consts/DbTableNames';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(MARKERS_TABLE_NAME, (table) => {
        table.string('id').primary();
        table.string('user_id').references('id').inTable(USERS_TABLE_NAME).notNullable();
        table.string('status').notNullable();
        table.string('title').notNullable();
        table.string('description');
        table.string('start_date');
        table.string('end_date');
        table.decimal('lat').notNullable();
        table.decimal('lng').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(MARKERS_TABLE_NAME);
}
