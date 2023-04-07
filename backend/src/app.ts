import express, { Express, Router } from 'express';
import dbConfig from '../DbConfig';
import { DbProvider } from '../database/DbProvider';
import { AppRouter } from './AppRouter';

export class App {
    private server: Express;

    public constructor(router: Router) {
        this.server = express();
        this.setupApp(router);
    }

    private setupApp(router: Router) {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
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
const router: Router = AppRouter.route(db);

export const app = new App(router);
