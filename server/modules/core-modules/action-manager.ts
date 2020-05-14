import * as fs from 'fs';
import { resolve } from 'path';
import { LoggerSingleton } from './logger';
import { RequestTypesEnum } from "../../types/enums/request-type.enum";

const logger = LoggerSingleton.getInstance();

export class Actions {
    private actions: any = {};

    constructor(actionsFilesPath: string) {
        this.loadModules(actionsFilesPath);
        logger.log(':List of loaded actions ↲');
        const actionsKeys = Object.keys(this.actions);
        actionsKeys.forEach(key => {
            logger.log('\t-' , key, '⇒', typeof this.actions[key]);
        });
        logger.log(':End');
    }

    private loadModules(path: string): void {
        const dirElements = fs.readdirSync(resolve(path), { withFileTypes: true });

        dirElements.forEach(el => {
            if (el.isDirectory()) {
                this.loadModules(path + '/' + el.name);
            } else {
                const handlerPath = resolve(path, el.name);
                this.add(el.name.replace('.js', ''), require(handlerPath).action);
            }
        });
    }

    public add(
        actionName: string,
        actionFunction: (type: RequestTypesEnum, req: any, res: any) => Promise<void>
    ): void {
        this.actions[actionName] = actionFunction;
    }

    public remove(actionName: string): void {
        this.actions[actionName] = null;
    }

    public execute(
        actionName: string,
        type: RequestTypesEnum,
        req: any,
        res: any
    ): void {
        this.actions[actionName](type, req, res);
    }
}
