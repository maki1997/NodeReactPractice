import express from "express";
import Database from "../services/Database";

export default abstract class BaseController {

    public router: express.Router;

    constructor(router: express.Router, protected baseRoute: string = "") {
        console.log('Initialization =>', this.constructor.name);
        this.router = router;
        this.registerRoutes();
    }

    protected get(routeName: string, callback: (req: any, res: any) => void): void {
        this.router.get(`${this.baseRoute}/${routeName}`, (req, res) => {
            this.callCallback(callback, req, res);
        });
    }

    protected post(routeName: string, callback: (req: any, res: any) => void): void {
        this.router.post(`${this.baseRoute}/${routeName}`, (req, res) => {
            this.callCallback(callback, req, res);
        });
    }

    protected put(routeName: string, callback: (req: any, res: any) => void): void {
        this.router.put(`${this.baseRoute}/${routeName}`, (req, res) => {
            this.callCallback(callback, req, res);
        });
    }

    protected delete(routeName: string, callback: (req: any, res: any) => void): void {
        this.router.delete(`${this.baseRoute}/${routeName}`, (req, res) => {
            this.callCallback(callback, req, res);
        });
    }

    /*Used for login.*/
    protected login(routeName: string, callback: (req: any, res: any) => void): void {
        this.router.post(`${this.baseRoute}/${routeName}`, callback);
    }

    protected registerRoutes(): void {
    }

    private async callCallback(callback: any, req: any, res: any) {
        try {
                return await callback(req, res);

        } catch (err) {
            return res.error(err.message, err.stack);
        }
    }

}
