import { Knex } from 'knex';
import { USERS_TABLE_NAME } from '../../database/consts/DbTableNames';
import { UserId } from '../../src/users/user-profile/UserId';
import { UserProfile } from '../../src/users/user-profile/UserProfile';
import { SQLUserProfileRepository, UserProfileRepository } from '../../src/users/user-profile/UserProfileRepository';

import { Express, Router } from 'express';
import path from 'path';
import request from 'supertest';
import config from '../../DbConfig';
import { DbProvider } from '../../database/DbProvider';
import { AppRouter } from '../../src/AppRouter';
import { App } from '../../src/app';
import { PhotoUploadConfig } from '../../src/common/FileSystemConfig';
import { LOGIN_ROUTE } from '../../src/users/UsersRouter';
import { LoginRequest } from '../../src/users/user-access/login/LoginRequest';

export class TestsUtils {
    static getDb() {
        const db_test_config: Knex.Config = config['test'] || {};
        return DbProvider.get(db_test_config);
    }

    static async createTestDatabase(db: Knex) {
        await db.migrate.latest();
        await db.seed.run();
    }

    static async login(server: Express): Promise<request.SuperAgentTest> {
        const agent: request.SuperAgentTest = request.agent(server);
        const loginBody: LoginRequest = { email: 'user-teste@teste.com', password: 'user-teste' };
        const resLogin = await agent.post(LOGIN_ROUTE).send(loginBody);
        expect(resLogin.status).toEqual(200);
        return agent;
    }

    static async loginCustom(server: Express, loginBody: LoginRequest): Promise<request.SuperAgentTest> {
        const agent: request.SuperAgentTest = request.agent(server);
        const resLogin = await agent.post(LOGIN_ROUTE).send(loginBody);
        expect(resLogin.status).toEqual(200);
        return agent;
    }

    static getApp(db: Knex): Express {
        const fileSystemConfig = new PhotoUploadConfig(path.join(process.cwd(), '/tests-uploads/'));
        const router: Router = AppRouter.route(db, fileSystemConfig);
        return new App(router, fileSystemConfig).getServer();
    }
}

export async function registerUser(db: Knex, userProfile: UserProfile): Promise<UserId> {
    const userIdentityRepository: UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
    return await userIdentityRepository.insert(userProfile);
}
