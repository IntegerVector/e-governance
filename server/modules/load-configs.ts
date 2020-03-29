import * as fs from 'fs';
import { LoggerSingleton } from './logger';
import { Configs } from '../types/interfaces/configs.interface';

const logger = LoggerSingleton.getInstance();

export function loadConfigs(configFilePath = 'config.json') {
    const configFileData = fs.readFileSync(configFilePath);

    try {
        return JSON.parse(configFileData.toString());
    } catch(err) {
        console.error(`Error while loading configs from ${configFilePath}, Error Msg: ${err}`);
        return {};
    }
}

export function checkConfigs(configs: Configs) {
    if (!configs.port) {
        logger.error('Server Port not present in config file! Please add it');
        return false;
    }

    if (!configs.withAdmins) {
        logger.error('withAdmins option not present in config file! It seems like error');
        return false;
    }

    if (!configs.dataBase) {
        logger.error('dataBase option not present in config file! It should be in config file');
    }

    if (!configs.sqlLogin) {
        logger.error('sqlLogin option not present in config file! It should be in config file');
        return false;
    }

    if (!configs.sqlPass) {
        logger.error('sqlPass option not present in config file! It should be in config file');
        return false;
    }

    return true;
}
