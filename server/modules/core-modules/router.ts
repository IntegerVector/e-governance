import * as express from 'express';
import * as fs from 'fs';
import { get } from 'lodash';
import { resolve } from 'path';
import {
    ROUTES_FILE_PATH,
    CLIENT_ROOT,
    MAIN_PAGE,
} from '../../constants/constants';
import { Actions } from './action-manager';
import { RouteInterface } from '../../types/interfaces/route.interface';
import { LoggerSingleton } from './logger';

const logger = LoggerSingleton.getInstance();

export class Router {
    private routes: RouteInterface[];
    private actionsManager: Actions;

    constructor(private server: express.Application) {
        this.routes = this.loadRoutes();
        this.actionsManager = new Actions('target/actions');
    }

    public initRoutes(): void {
        this.server.get('/', (req, res) => {
            res.redirect(MAIN_PAGE);
        });

        this.server.get(/.+\.((html)|(js)|(map)|(ico)|(ttf))/, (req, res) => {
            const pathMatch = req.url.match(/.+\.((html)|(js)|(map)|(ico)|(ttf))/);
            logger.info('File request:', CLIENT_ROOT + req.url);
            res.sendFile(resolve(CLIENT_ROOT + get(pathMatch, '[0]')));
        });

        this.routes.forEach((rout: RouteInterface) => {
            this.server.post(new RegExp(rout.url), (req, res) => {
                this.actionsManager.execute(rout.action, rout.type, req, res);
            });
        });
    }

    private loadRoutes(): RouteInterface[] {
        const data = fs.readFileSync(ROUTES_FILE_PATH);
        return JSON.parse(data.toString());
    }
}
