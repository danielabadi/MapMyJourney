import { Router } from 'express';
import { Knex } from 'knex';
import { UsersRouter } from './users/UsersRouter';

export class AppRouter {
    public static route(db: Knex): Router {
        const router: Router = Router();
        router.use(UsersRouter.route(db));
        return router;
    }
}
