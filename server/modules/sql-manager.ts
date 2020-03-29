import { createConnection } from 'mysql';
import { LoggerSingleton } from './logger';
import { HOST } from '../constants/constants';
import { DB_MULTIPLE_USERS_WITH_SAME_ID, DB_MULTIPLE_STATUSES_WITH_SAME_ID, DB_STATUSE_DOESNT_EXISTS, DB_MULTIPLE_TYPES_WITH_SAME_ID, DB_TYPE_DOESNT_EXISTS, DB_PERMISSIONS_TYPES_WITH_SAME_ID, DB_PERMISSION_DOESNT_EXISTS } from '../constants/errors';
import { UserStatus } from '../types/enums/user-status.enum';
import { UserType } from '../types/enums/user-type.enum';
import { Permissions } from '../types/enums/permissions.enum';

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
                resolve();
            });
        });
    }

    public async getPermissionId(permission: Permissions): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const request = `select permissionId from Permissions where permission = '${permission}';`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
                reject(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
            }

            if (result.length === 0) {
                logger.error(DB_PERMISSION_DOESNT_EXISTS);
                reject(DB_PERMISSION_DOESNT_EXISTS);
            }

            resolve(result[0].permission);
        });
    }

    public async getPermissionById(permissionId: number): Promise<Permissions> {
        return new Promise(async (resolve, reject) => {
            const request = `select permission from Permissions where permissionId = ${permissionId};`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
                reject(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
            }

            if (result.length === 0) {
                logger.error(DB_PERMISSION_DOESNT_EXISTS);
                reject(DB_PERMISSION_DOESNT_EXISTS);
            }

            resolve(result[0].permission);
        });
    }

    public async getUserTypeById(userTypeId: number): Promise<UserType> {
        return new Promise(async (resolve, reject) => {
            const request = `select type from UserType where userTypeId = ${userTypeId};`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_TYPES_WITH_SAME_ID);
                reject(DB_MULTIPLE_TYPES_WITH_SAME_ID);
            }

            if (result.length === 0) {
                logger.error(DB_TYPE_DOESNT_EXISTS);
                reject(DB_TYPE_DOESNT_EXISTS);
            }

            resolve(result[0].type);
        });
    }

    public async getUserStatusById(userStatusId: number): Promise<UserStatus> {
        return new Promise(async (resolve, reject) => {
            const request = `select status from UserStatus where userStatusId = ${userStatusId};`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_STATUSES_WITH_SAME_ID);
                reject(DB_MULTIPLE_STATUSES_WITH_SAME_ID);
            }

            if (result.length === 0) {
                logger.error(DB_STATUSE_DOESNT_EXISTS);
                reject(DB_STATUSE_DOESNT_EXISTS);
            }

            resolve(result[0].status);
        });
    }

    public async isPermitted(userTypeId: number, permission: Permissions): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const permissionId = await this.getPermissionId(permission);
            const request = `select permissionId from UserTypePermissions where userTypeId = ${userTypeId};`;
            const result = await this.query(request);

            if (result.length === 0) {
                logger.error(DB_TYPE_DOESNT_EXISTS);
                reject(DB_TYPE_DOESNT_EXISTS);
            }

            result.find(value => permissionId === value)
                ? resolve(true)
                : resolve(false);
        });
    }

    public async checkUserId(userId: number): Promise<boolean> {
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
