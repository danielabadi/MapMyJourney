import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { Knex } from 'knex';
import { USERS_TABLE_NAME } from '../../database/consts/DbTableNames';
import { BcryptHashService, HashService } from './hash-service/HashService';
import { RegisterUserCommandHandler } from './register-user/RegisterUserCommandHandler';
import { IRegisterUserController, RegisterUserController } from './register-user/RegisterUserController';
import { validateRegisterUser } from './register-user/registerUser.validators.middlewares';
import { EmailUniquenessChecker, IEmailUniquenessChecker } from './user-profile/EmailUniquenessChecker';
import { SQLUserProfileRepository, UserProfileRepository } from './user-profile/UserProfileRepository';

const URI_v1 = '/api/v1';
export const USERS_ROUTE = URI_v1 + '/users';

export const LOGIN_ROUTE = '/login';
export const LOGOUT_ROUTE = '/logout';

export class UsersRouter {
    private static setupRegisterUserRoute(registerUserController: IRegisterUserController, router: Router) {
        router.post(USERS_ROUTE, checkSchema(validateRegisterUser), async (req: Request, res: Response) => {
            return await registerUserController.registerUser(req, res);
        });
    }

    public static route(db: Knex): Router {
        const router: Router = Router();

        const userProfileRepository: UserProfileRepository = new SQLUserProfileRepository(db, USERS_TABLE_NAME);
        const hashService: HashService = new BcryptHashService();
        const emailUniquenessChecker: IEmailUniquenessChecker = new EmailUniquenessChecker(userProfileRepository);
        const registerUserController: IRegisterUserController = new RegisterUserController(
            new RegisterUserCommandHandler(userProfileRepository, hashService, emailUniquenessChecker),
        );
        this.setupRegisterUserRoute(registerUserController, router);

        return router;
    }
}
