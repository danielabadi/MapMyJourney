import { knex, Knex } from 'knex';

export class DbProvider {
    get(dbConfig: Knex.Config): Knex {
        return knex(dbConfig);
    }
}
