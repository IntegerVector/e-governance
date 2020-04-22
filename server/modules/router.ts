import * as express from 'express';
import * as fs from 'fs';
import { resolve } from 'path';
import { ROUTES_FILE_PATH, CLIENT_ROOT, MAIN_PAGE, USER_DATA_FILES_PATH } from '../constants/constants';
import { Actions } from './action-manager';
import { RouteInterface } from '../types/interfaces/route.interface';
import { LoggerSingleton } from './logger';

const logger = LoggerSingleton.getInstance();

export class Router {
    private routes: RouteInterface[];

    constructor(private server: express.Application) {
        this.routes = this.loadRoutes();
    }

    public initRoutes(): void {
        this.server.get('/', (req, res) => {
            res.redirect(MAIN_PAGE);
        });

        this.server.get(MAIN_PAGE + '/*', (req, res) => {
            res.sendFile(resolve(CLIENT_ROOT + MAIN_PAGE));
        });

        this.server.get(USER_DATA_FILES_PATH + '/*', (req, res) => {
            res.sendFile(resolve(CLIENT_ROOT + req.url));
        });

        this.server.get(/.+\.(html)|(js)|(map)|(ico)|(ttf)/, (req, res) => {
            logger.info('File request:', CLIENT_ROOT + req.url);
            res.sendFile(resolve(CLIENT_ROOT + req.url));
        });

        this.routes.forEach((rout: RouteInterface) => {
            this.server.post(new RegExp(rout.url), (req, res) => {
                Actions.execute(rout.action, rout.type, req, res);
            });
        });
    }

    private loadRoutes(): RouteInterface[] {
        const data = fs.readFileSync(ROUTES_FILE_PATH);
        return JSON.parse(data.toString());
    }
}
