import { Router } from 'express';
import { Knex } from 'knex';
import { FileSystemConfig } from './common/FileSystemConfig';
import { MarkerRouter } from './markers/MarkersRouter';
import { UsersRouter } from './users/UsersRouter';

export class AppRouter {
    public static route(db: Knex, fileSystemConfig: FileSystemConfig): Router {
        const router: Router = Router();
        router.use(UsersRouter.route(db));
        router.use(MarkerRouter.route(db, fileSystemConfig));
        return router;
    }
}
