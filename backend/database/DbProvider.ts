import { knex, Knex } from 'knex';

export class DbProvider {
    static get(dbConfig: Knex.Config): Knex {
        return knex(dbConfig);
    }
}
