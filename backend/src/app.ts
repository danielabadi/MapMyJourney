import express, { Express, Router } from 'express';
import session from 'express-session';
import nocache from 'nocache';
import path from 'path';
import dbConfig from '../DbConfig';
import { DbProvider } from '../database/DbProvider';
import { AppRouter } from './AppRouter';
import { FileSystemConfig, PhotoUploadConfig } from './common/FileSystemConfig';
import { SESSION_CONFIG } from './users/user-access/user-session/sessions.config';
export class App {
    private server: Express;

    public constructor(router: Router) {
        this.server = express();
        this.setupApp(router);
    }

    private setupApp(router: Router) {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
        this.server.use(session(SESSION_CONFIG));
        this.server.use(nocache());
        this.server.use(router);
    }

    public getServer(): Express {
        return this.server;
    }

    public run(port: number) {
        this.server
            .listen(port, () => {
                console.log(`Server up and running on port ${port}!`);
            })
            .on('error', console.log);
    }
}

const db = DbProvider.get(dbConfig['development']);
const fileSystemConfig: FileSystemConfig = new PhotoUploadConfig(path.join(process.cwd(), '/uploads/'));
const router: Router = AppRouter.route(db, fileSystemConfig);

export const app = new App(router);
