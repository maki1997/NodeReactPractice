import express from "express";
import initConfig from "./config/init.json";
import config from "./config/tsconfig.json";

const APP_VERSION = config.version;

export default class Routes {
    public readonly CONTROLLERS_PATH: string = "./controller/";
    public readonly SERVICES_PATH: string = "./services/";
    public router: express.Router = express.Router();
    public app: express.Application;
    public arr: [];

    constructor(app: express.Application) {
        this.app = app;
        this._config();
    }

    public printRoutes(): void {
        console.log("-------------- Routes " + this.router.stack.length + " -------------");
        this.router.stack.forEach(route => {
            if (route.route) {
                console.log(Object.keys(route.route.methods), "/" + APP_VERSION + route.route.path);//, "match =>", route.regexp
            }
        });
        console.log("-------------- End Routes --------------");
    }

    private async _getServices(serviceNames: string[]): Promise<any[]> {
        if (serviceNames && serviceNames.length) {
            console.log("Loading service dependencies...");

            return new Promise<any[]>(async (resolve, reject) => {
                const services: any[] = [];
                for (const service of serviceNames) {
                    console.log("Service loaded: " + service);

                    const serviceImport = await import(`${this.SERVICES_PATH}${service}`);
                    const Service = new serviceImport.default(); // Init service
                    services.push(Service);
                }
                console.log("Services loaded");
                resolve(services);
            });
        }
        return Promise.resolve([]);
    }

    private async _config(): Promise<boolean> {
        console.log("Loading controllers...");

        for (const ctrl of initConfig.controllers) {
            const importScript = await import(`${this.CONTROLLERS_PATH}${ctrl.name}`);
            const services: any[] = await this._getServices(
                /*ctrl.dependencies && ctrl.dependencies.services ? ctrl.dependencies.services :*/[]
            );
            // Bootstrap controllers, init routes
            const RouteController = new importScript.default(this.router, ctrl.route, ...services);
        }
        this.printRoutes();
        return Promise.resolve(true);
    }
}
