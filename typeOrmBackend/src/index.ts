import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes/routes";
import * as cors from "cors";


createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/",routes);
    app.listen(4000);
    console.log("App running.....");

}).catch(error => console.log("Connection error: ", error));
