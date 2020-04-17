import * as fs from 'fs';
import { LOG_FILE_PATH } from '../constants/constants';
import { LogTypes } from '../types/enums/log-types.enum';
import { Logs } from '../types/interfaces/logs.interface';

const defaultLogs: Logs = {
    logs: [],
    infos: [],
    warnings: [],
    errors: []
};

class Logger {
    constructor(private logFilePath: string) {}

    public log(...msgs: string[]) {
        const text = this.getDataToLog(LogTypes.Log, ...msgs);
        console.log(text);
        this.save(LogTypes.Log, text);
        return text;
    }

    public info(...msgs: string[]) {
        const text = this.getDataToLog(LogTypes.Info, ...msgs);
        console.info(text);
        this.save(LogTypes.Info, text);
        return text;
    }

    public warning(...msgs: string[]) {
        const text = this.getDataToLog(LogTypes.Warning, ...msgs);
        console.warn(text);
        this.save(LogTypes.Warning, text);
        return text;
    }

    public error(...msgs: string[]) {
        const text = this.getDataToLog(LogTypes.Error, ...msgs);
        console.error(text);
        this.save(LogTypes.Error, text);
        return text;
    }

    private async save(type: LogTypes, text: string): Promise<void> {
        try {
            const logs = this.readLogs();
            logs[type] = [...logs[type], text];
            this.writeLogs(logs);
        }
        catch (err) {
            throw "Logs saving failed";
        }
    }

    private readLogs(): Logs {
        try {
            const data = fs.readFileSync(this.logFilePath);
            const logs = JSON.parse(data.toString());
            return logs;
        }
        catch (err) {
            return defaultLogs;
        }
    }

    private writeLogs(logs: Logs): void {
        fs.writeFileSync(this.logFilePath, JSON.stringify(logs, null, 4));
    }

    private getDataToLog(type: LogTypes, ...msgs: string[]): string {
        const date = new Date();
        const template = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] => ${msgs.join(' ')}`;
        switch(type) {
            case LogTypes.Info:
                return `[INFO: ${template}`;
            case LogTypes.Log:
                return `[LOG: ${template}`;
            case LogTypes.Warning:
                return `[WARNING: ${template}`;
            case LogTypes.Error:
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
