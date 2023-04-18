import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import { Knex } from 'knex';
import { USERS_TABLE_NAME } from '../../database/consts/DbTableNames';
import { EditUserCommandHandler } from './edit-user/EditUserCommandHandler';
import { EditUserController, IEditUserController } from './edit-user/EditUserController';
import { validateEditUser } from './edit-user/editUser.validators.middlewares';
import { BcryptHashService, HashService } from './hash-service/HashService';
import { RegisterUserCommandHandler } from './register-user/RegisterUserCommandHandler';
import { IRegisterUserController, RegisterUserController } from './register-user/RegisterUserController';
import { validateRegisterUser } from './register-user/registerUser.validators.middlewares';
import { ILoginController, LoginController } from './user-access/login/LoginController';
import { validateLogin } from './user-access/login/login.validators.middlewares';
import { ILogoutController, LogoutController } from './user-access/logout/LogoutController';
import { InMemoryUserSessionRepository, UserSessionRepository } from './user-access/user-session/UserSessionRepository';
import { UserSessionAuthenticationService } from './user-access/user-session/UserSessionService';
import { checkLogin, checkNotLogin } from './user-access/user-session/checkSession.middleware';
import { EmailUniquenessChecker, IEmailUniquenessChecker } from './user-profile/EmailUniquenessChecker';
import { SQLUserProfileRepository, UserProfileRepository } from './user-profile/UserProfileRepository';

const URI_v1 = '/api/v1';
export const USERS_ROUTE = URI_v1 + '/users';

export const LOGIN_ROUTE = URI_v1 + '/login';
export const LOGOUT_ROUTE = URI_v1 + '/logout';

export class UsersRouter {
    private static setupLoginRoute(loginController: ILoginController, router: Router) {
        router.post(LOGIN_ROUTE, checkNotLogin, checkSchema(validateLogin), async (req: Request, res: Response) => {
            return await loginController.login(req, res);
        });
    }

    private static setupLogoutRoute(logoutController: ILogoutController, router: Router) {
        router.post(LOGOUT_ROUTE, checkLogin, (req: Request, res: Response) => {
            return logoutController.logout(req, res);
        });
    }

    private static setupRegisterUserRoute(registerUserController: IRegisterUserController, router: Router) {
        router.post(
            USERS_ROUTE,
            checkNotLogin,
            checkSchema(validateRegisterUser),
            async (req: Request, res: Response) => {
                return await registerUserController.registerUser(req, res);
            },
        );
    }

    private static setupEditUserRoute(editUserController: IEditUserController, router: Router) {
        router.put(USERS_ROUTE, checkLogin, checkSchema(validateEditUser), async (req: Request, res: Response) => {
            return await editUserController.editUser(req, res);
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

        const editUserController: IEditUserController = new EditUserController(
            new EditUserCommandHandler(userProfileRepository, hashService),
        );
        this.setupEditUserRoute(editUserController, router);

        const userSessionRepository: UserSessionRepository = new InMemoryUserSessionRepository();
        const userSessionService = new UserSessionAuthenticationService(
            userProfileRepository,
            hashService,
            userSessionRepository,
        );
        const loginController: ILoginController = new LoginController(userSessionService);
        this.setupLoginRoute(loginController, router);

        const logoutController: ILogoutController = new LogoutController(userSessionService);
        this.setupLogoutRoute(logoutController, router);

        return router;
    }
}
