import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from 'dotenv';
import Routes from './routes';
import Database from './services/Database';
import config from './config/tsconfig.json';
import responseMiddleware from './middlewares/ResponseMiddleware';
import cors from "cors";

const APP_VERSION = config.version;

class App {
    public app: express.Application;
    public routes: Routes;

    constructor() {
        this.app = express();
        this._config();
        this._init();
    }

    private async _init() {
        await Database.createConnection();
        this.routes = new Routes(this.app);
        this.app.use('/' + APP_VERSION, this.routes.router);
        this.routes.router.use(responseMiddleware);
    }

    private _config(): void {
        dotenv.config();
        this.app.use(bodyParser.json()); //*** Application/json
        this.app.use(bodyParser.urlencoded({ extended: true })); //*** Application/x-www-form-urlencoded
        this.app.use(compression());
        this.app.use(cors());
    }
}

export default new App().app;
