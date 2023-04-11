import { Router } from 'express';
import { Knex } from 'knex';
import { UsersRouter } from './users/UsersRouter';
import { MarkerRouter } from './markers/MarkersRouter';

export class AppRouter {
    public static route(db: Knex): Router {
        const router: Router = Router();
        router.use(UsersRouter.route(db));
        router.use(MarkerRouter.route(db));
        return router;
    }
}
