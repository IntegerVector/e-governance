import * as express from 'express';
import { resolve } from 'path';
import { loadConfigs, checkConfigs } from './load-configs';
import { Router } from './router';
import { ConfigsInterface } from '../types/interfaces/configs.interface';
import { SQLManagerSingleton } from './sql-manager';
import { LoggerSingleton } from './logger';

const logger = LoggerSingleton.getInstance();
const sql = SQLManagerSingleton.getInstance();

export class Server {
    private server = (<any>express)();
    private listen: any = null;
    private configs: ConfigsInterface;
    private router = new Router(this.server);

    constructor(private configFilePath: string) {
        this.configFilePath = resolve(this.configFilePath);
        this.configs = loadConfigs(this.configFilePath);
        if (!checkConfigs(this.configs)) {
            this.stop();
            const err = 'Error while loa ding server configs, check your config.json file';
            logger.error(err);
            throw err;
        }
    }

    private async init(): Promise<void> {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.router.initRoutes();
        await sql.connect(this.configs.dataBase, this.configs.sqlLogin, this.configs.sqlPass);
    }

    public async run(): Promise<void> {
        await this.init();
        this.listen = this.server.listen(this.configs.port);
    }

    public stop(): void {
        if (this.listen) {
            this.listen.close();
        }
    }
}
