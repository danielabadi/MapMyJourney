import express, { Express } from 'express';

export class App {
    private server: Express;

    public constructor() {
        this.server = express();
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
export const app = new App();
