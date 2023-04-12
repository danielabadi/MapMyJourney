import { Request, Response, Router } from 'express';
import { Knex } from 'knex';
import { checkLogin } from '../users/user-access/user-session/checkSession.middleware';
import { IRegisterMarkerController, RegisterMarkerController } from './register-marker/RegisterMarkerController';
import { MarkerRepository, SQLMarkerRepository } from './marker/MarkerRepository';
import { MARKERS_TABLE_NAME } from '../../database/consts/DbTableNames';
import { RegisterMarkerCommandHandler } from './register-marker/RegisterMarkerCommandHandler';

const URI_v1 = '/api/v1';
export const MARKERS_ROUTE = URI_v1 + '/markers';

export class MarkerRouter {
    private static setUpRegisterMarkerRoute(registerMarkerController: IRegisterMarkerController, router: Router) {
        router.post(MARKERS_ROUTE, checkLogin, async (req: Request, res: Response) => {
            return await registerMarkerController.registerMarker(req, res);
        });
    }

    public static route(db: Knex): Router {
        const router: Router = Router();

        const markerRepository: MarkerRepository = new SQLMarkerRepository(db, MARKERS_TABLE_NAME);

        const registerMarkerController: IRegisterMarkerController = new RegisterMarkerController(
            new RegisterMarkerCommandHandler(markerRepository),
        );
        this.setUpRegisterMarkerRoute(registerMarkerController, router);

        return router;
    }
}