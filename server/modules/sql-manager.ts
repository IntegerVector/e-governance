import { createConnection } from 'mysql';
import { LoggerSingleton } from './logger';
import { HOST } from '../constants/constants';
import { DB_MULTIPLE_USERS_WITH_SAME_ID } from '../constants/errors';

const logger = LoggerSingleton.getInstance();

class SQLManager {
    private connection: any;

    constructor() {}

    public async connect(database: string, user: string, password: string): Promise<void> {
        this.connection = createConnection({
            host: HOST,
            database,
            user,
            password,
            insecureAuth : true
        });

        return new Promise((resolve, reject) => {
            this.connection.connect((err: string) => {
                if (err) {
                    logger.error(err);
                    reject(err);
                }
    
                logger.info("SQL DB Connected");
                this.query(`use ${database};`);
                this.checkUserId('0').then(r => {
                    console.log(r);
                });
                resolve();
            });
        });
    }

    public async checkUserId(userId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const request = `select userId from User where userId = ${userId};`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_USERS_WITH_SAME_ID);
                reject(DB_MULTIPLE_USERS_WITH_SAME_ID);
            }

            if (+result[0].userId === +userId) {
                resolve(true);
            }

            resolve(false);
        });
    }

    public async checkToken(userId: string, token: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const request = `select userToken from User where userId = ${userId};`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_USERS_WITH_SAME_ID);
                reject(DB_MULTIPLE_USERS_WITH_SAME_ID);
            }

            if (result[0].userToken.toString() === token.toString()) {
                resolve(true);
            }

            resolve(false);
        });
    }

    private async query(sqlQuery: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sqlQuery, (err: string, result: object[]) => {
                if (err) {
                    logger.error(err);
                    reject(err);
                }
    
                resolve(result);
            });
        });
    }
}

export const SQLManagerSingleton = (function () {
    var instance: SQLManager;
 
    function createInstance() {
        return new SQLManager();
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
