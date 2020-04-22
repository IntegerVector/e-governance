import * as fs from 'fs';
import { LOG_FILE_PATH } from '../constants/constants';
import { LogTypesEnum } from '../types/enums/log-types.enum';
import { LogsInterface } from '../types/interfaces/logs.interface';

const defaultLogs: LogsInterface = {
    logs: [],
    infos: [],
    warnings: [],
    errors: []
};

class Logger {
    constructor(private logFilePath: string) {}

    public log(...msgs: string[]) {
        const text = this.getDataToLog(LogTypesEnum.Log, ...msgs);
        console.log(text);
        this.save(LogTypesEnum.Log, text);
        return text;
    }

    public info(...msgs: string[]) {
        const text = this.getDataToLog(LogTypesEnum.Info, ...msgs);
        console.info(text);
        this.save(LogTypesEnum.Info, text);
        return text;
    }

    public warning(...msgs: string[]) {
        const text = this.getDataToLog(LogTypesEnum.Warning, ...msgs);
        console.warn(text);
        this.save(LogTypesEnum.Warning, text);
        return text;
    }

    public error(...msgs: string[]) {
        const text = this.getDataToLog(LogTypesEnum.Error, ...msgs);
        console.error(text);
        this.save(LogTypesEnum.Error, text);
        return text;
    }

    private async save(type: LogTypesEnum, text: string): Promise<void> {
        try {
            const logs = this.readLogs();
            logs[type] = [...logs[type], text];
            this.writeLogs(logs);
        }
        catch (err) {
            throw "LogsInterface saving failed";
        }
    }

    private readLogs(): LogsInterface {
        try {
            const data = fs.readFileSync(this.logFilePath);
            const logs = JSON.parse(data.toString());
            return logs;
        }
        catch (err) {
            return defaultLogs;
        }
    }

    private writeLogs(logs: LogsInterface): void {
        fs.writeFileSync(this.logFilePath, JSON.stringify(logs, null, 4));
    }

    private getDataToLog(type: LogTypesEnum, ...msgs: string[]): string {
        const date = new Date();
        const template = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] => ${msgs.join(' ')}`;
        switch(type) {
            case LogTypesEnum.Info:
                return `[INFO: ${template}`;
            case LogTypesEnum.Log:
                return `[LOG: ${template}`;
            case LogTypesEnum.Warning:
                return `[WARNING: ${template}`;
            case LogTypesEnum.Error:
                return `[ERROR: ${template}`;
        }
    }
}

export const LoggerSingleton = (function () {
    var instance: Logger;
 
    function createInstance() {
        return new Logger(LOG_FILE_PATH);
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
