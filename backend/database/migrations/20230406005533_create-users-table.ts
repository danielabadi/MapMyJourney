import { Knex } from 'knex';
import { USERS_TABLE_NAME } from '../consts/DbTableNames';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(USERS_TABLE_NAME, (table) => {
        table.string('id').primary();
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('birthdate').notNullable();
        table.string('description');
        table.string('password').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(USERS_TABLE_NAME);
}
