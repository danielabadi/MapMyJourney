import { Request, Response, Router } from 'express';
import { Knex } from 'knex';
import multer from 'multer';
import { MARKERS_TABLE_NAME, PHOTOS_TABLE_NAME } from '../../database/consts/DbTableNames';
import { FileSystemConfig } from '../common/FileSystemConfig';
import { checkLogin } from '../users/user-access/user-session/checkSession.middleware';
import { EditMarkerCommandHandler } from './edit-marker/EditMarkerCommandHandler';
import { EditMarkerController, IEditMarkerController } from './edit-marker/EditMarkerController';
import { GetMarkerCommandHandler } from './get-marker/GetMarkerCommandHandler';
import { GetMarkerController, IGetMarkerController } from './get-marker/GetMarkerController';
import { MarkerRepository, SQLMarkerRepository } from './marker/MarkerRepository';
import { RegisterMarkerCommandHandler } from './register-marker/RegisterMarkerCommandHandler';
import { IRegisterMarkerController, RegisterMarkerController } from './register-marker/RegisterMarkerController';

const URI_v1 = '/api/v1';
export const MARKERS_ROUTE = URI_v1 + '/markers';

export class MarkerRouter {
    private static setUpRegisterMarkerRoute(
        registerMarkerController: IRegisterMarkerController,
        fileSystemConfig: FileSystemConfig,
        router: Router,
    ) {
        router.post(
            MARKERS_ROUTE,
            checkLogin,
            this.getFileStorageConfigs(fileSystemConfig),
            async (req: Request, res: Response) => {
                return await registerMarkerController.registerMarker(req, res);
            },
        );
    }

    private static setUpEditMarkerRoute(
        editMarkerController: IEditMarkerController,
        fileSystemConfig: FileSystemConfig,
        router: Router,
    ) {
        router.put(
            MARKERS_ROUTE,
            checkLogin,
            this.getFileStorageConfigs(fileSystemConfig),
            async (req: Request, res: Response) => {
                return await editMarkerController.editMarker(req, res);
            },
        );
    }

    private static setUpGetMarkerRoute(getMarkerController: IGetMarkerController, router: Router) {
        router.get(MARKERS_ROUTE, checkLogin, async (req: Request, res: Response) => {
            return await getMarkerController.getMarker(req, res);
        });
    }

    private static getFileStorageConfigs(fileSystemConfig: FileSystemConfig) {
        const storage = multer.diskStorage({
            destination: function (_req, _file, cb) {
                cb(null, fileSystemConfig.getUploadPath());
            },
            filename: function (_req, file, cb) {
                const ext = file.mimetype.split('/')[1];
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
            },
        });
        const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

        return multer({
            storage: storage,
            fileFilter: (_req, file, cb) => {
                if (!whitelist.includes(file.mimetype)) {
                    return cb(new Error('file is not allowed'));
                }

                cb(null, true);
            },
        }).array('uploadedImages', 5);
    }

    public static route(db: Knex, fileSystemConfig: FileSystemConfig): Router {
        const router: Router = Router();

        const markerRepository: MarkerRepository = new SQLMarkerRepository(
            db,
            fileSystemConfig,
            MARKERS_TABLE_NAME,
            PHOTOS_TABLE_NAME,
        );

        const registerMarkerController: IRegisterMarkerController = new RegisterMarkerController(
            new RegisterMarkerCommandHandler(markerRepository),
        );
        this.setUpRegisterMarkerRoute(registerMarkerController, fileSystemConfig, router);

        const editMarkerController: IEditMarkerController = new EditMarkerController(
            new EditMarkerCommandHandler(markerRepository),
        );
        this.setUpEditMarkerRoute(editMarkerController, fileSystemConfig, router);

        const getMarkercontroller: IGetMarkerController = new GetMarkerController(
            new GetMarkerCommandHandler(markerRepository),
        );
        this.setUpGetMarkerRoute(getMarkercontroller, router);

        return router;
    }
}
