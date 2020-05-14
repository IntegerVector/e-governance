import { createConnection } from 'mysql';
import { LoggerSingleton } from '../core-modules/logger';
import { HOST } from '../../constants/constants';
import {
    DB_MULTIPLE_USERS_WITH_SAME_ID,
    DB_MULTIPLE_STATUSES_WITH_SAME_ID,
    DB_STATUSE_DOESNT_EXISTS,
    DB_MULTIPLE_TYPES_WITH_SAME_ID,
    DB_TYPE_DOESNT_EXISTS,
    DB_PERMISSIONS_TYPES_WITH_SAME_ID,
    DB_PERMISSION_DOESNT_EXISTS,
    CLIENT_INVALID_USER_ID,
    CLIENT_INVALID_TOKEN,
    CLIENT_INVALID_LOGIN_OR_PASS,
    CLIENT_INVALID_USER_DATA_ID,
    CLIENT_INVALID_USER_TYPE_ID
} from '../../constants/errors';
import { UserStatusEnum } from '../../types/enums/user-status.enum';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { Permissions } from '../../types/dto/permissions-dto';
import { User } from '../../types/dto/user-dto';
import { getToken } from '../security-modules/token-generator';
import { UserData } from '../../types/dto/user-data-dto';
import { UserTypeEnum } from '../../types/enums/user-type.enum';
import { UserType } from '../../types/dto/user-type-dto';
import { compare, encrypt } from '../security-modules/password-encrypter';
import { UserStatus } from '../../types/dto/user-status-dto';
import { DocumentTypesEnum } from '../../types/enums/document-types.enum';
import * as _ from 'lodash';
import { Documents } from '../../types/dto/documents-dto';
import { DocumentTypes } from '../../types/dto/document-types-dto';

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
                    return;
                }
    
                logger.info("SQL DB Connected");
                this.query(`use ${database};`);
                resolve();
            });
        });
    }

    public async getDocumentTypes(): Promise<DocumentTypes[]> {
        return new Promise(async (resolve, reject) => {
            const request = 'select * from DocumentTypes;';
            const result = await this.query(request);

            resolve(result);
        });
    }

    public async getDocumentTypeById(documentTypeId: string): Promise<DocumentTypesEnum> {
        return new Promise(async (resolve, reject) => {
            const types = await this.getDocumentTypes();
            const type = _.find(types, type => {
                return type.documentTypeId == documentTypeId;
            });

            resolve(_.get(type, 'typeName'));
        });
    }

    public async getDocumentsByUserDataId(userDataId: string): Promise<Documents[]> {
        return new Promise(async (resolve, reject) => {
            const request = `select * from UsersDocuments where userDataId = "${userDataId}"`;
            const usersDocuments = await this.query(request);
            const documentsIds = _.map(usersDocuments, 'documentId');
            const documentsPromises: Promise<Documents>[] = _.map(documentsIds, id => {
                return this.getDocumentByDocumentId(id);
            });

            const documents = await Promise.all(documentsPromises);

            resolve(documents);
        });
    }

    public async getDocumentByDocumentId(documentId: string): Promise<Documents> {
        return new Promise(async (resolve, reject) => {
            const request = `select * from Documents where documentId = "${documentId}"`;
            const result = await this.query(request);

            resolve(_.get(result, '[0]'));
        });
    }

    public async getPermissionId(permission: Permissions): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const request = `select permissionId from Permissions where permission = "${permission}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
                reject(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
                return;
            }

            if (result.length === 0) {
                logger.error(DB_PERMISSION_DOESNT_EXISTS);
                reject(DB_PERMISSION_DOESNT_EXISTS);
                return;
            }

            resolve(result[0].permission);
        });
    }

    public async getPermissionById(permissionId: number): Promise<PermissionsEnum> {
        return new Promise(async (resolve, reject) => {
            const request = `select permission from Permissions where permissionId = "${permissionId}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
                reject(DB_PERMISSIONS_TYPES_WITH_SAME_ID);
                return;
            }

            if (result.length === 0) {
                logger.error(DB_PERMISSION_DOESNT_EXISTS);
                reject(DB_PERMISSION_DOESNT_EXISTS);
                return;
            }

            resolve(result[0].permission);
        });
    }

    public async getTypes(): Promise<UserType[]> {
        return new Promise(async (resolver, reject) => {
            const request = 'select * from UserType;';
            const result = await this.query(request);

            resolver(result);
        });
    }

    public async getUserTypeById(userTypeId: number): Promise<UserType> {
        return new Promise(async (resolve, reject) => {
            const request = `select type from UserType where userTypeId = "${userTypeId}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_TYPES_WITH_SAME_ID);
                reject(DB_MULTIPLE_TYPES_WITH_SAME_ID);
                return;
            }

            if (result.length === 0) {
                logger.error(DB_TYPE_DOESNT_EXISTS);
                reject(DB_TYPE_DOESNT_EXISTS);
                return;
            }

            resolve(result[0].type);
        });
    }

    public async getUserTypeId(userType: UserTypeEnum): Promise<string> {
        return new Promise(async (resolver, reject) => {
            const request = `select userTypeId from UserType where type = "${userType}";`;
            const result = await this.query(request);

            resolver(result[0].userTypeId);
        });
    }

    public async getStatuses(): Promise<UserStatus[]> {
        return new Promise(async (resolver, reject) => {
            const request = 'select * from UserStatus;';
            const result = await this.query(request);

            resolver(result);
        });
    }

    public async getUserStatusById(userStatusId: number): Promise<UserStatus> {
        return new Promise(async (resolve, reject) => {
            const request = `select status from UserStatus where userStatusId = "${userStatusId}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_STATUSES_WITH_SAME_ID);
                reject(DB_MULTIPLE_STATUSES_WITH_SAME_ID);
                return;
            }

            if (result.length === 0) {
                logger.error(DB_STATUSE_DOESNT_EXISTS);
                reject(DB_STATUSE_DOESNT_EXISTS);
                return;
            }

            resolve(result[0].status);
        });
    }

    public async getUserStatusId(userStatus: UserStatusEnum): Promise<string> {
        return new Promise(async (resolver, reject) => {
            const request = `select userStatusId from UserStatus where status = "${userStatus}";`;
            const result = await this.query(request);

            resolver(result[0].userStatusId);
        });
    }

    public async isPermitted(userTypeId: number, permission: Permissions): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const permissionId = await this.getPermissionId(permission);
            const request = `select permissionId from UserTypePermissions where userTypeId = "${userTypeId}";`;
            const result = await this.query(request);

            if (result.length === 0) {
                logger.error(DB_TYPE_DOESNT_EXISTS);
                reject(DB_TYPE_DOESNT_EXISTS);
                return;
            }

            result.find(value => permissionId == value)
                ? resolve(true)
                : resolve(false);
        });
    }

    public async checkUserId(userId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!parseInt(userId)) {
                logger.error(CLIENT_INVALID_USER_ID);
                reject(CLIENT_INVALID_USER_ID);
                return;
            }

            const request = `select userId from User where userId = "${userId}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_USERS_WITH_SAME_ID);
                reject(DB_MULTIPLE_USERS_WITH_SAME_ID);
                return;
            }

            if (+result[0].userId === +userId) {
                resolve(true);
            }

            resolve(false);
        });
    }

    public async checkToken(userId: string, token: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!parseInt(userId)) {
                logger.error(CLIENT_INVALID_USER_ID);
                reject(CLIENT_INVALID_USER_ID);
                return;
            }
            if (!token) {
                logger.error(CLIENT_INVALID_TOKEN);
                reject(CLIENT_INVALID_TOKEN);
                return;
            }

            const request = `select userToken from User where userId = "${userId}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_USERS_WITH_SAME_ID);
                reject(DB_MULTIPLE_USERS_WITH_SAME_ID);
            }

            if (result[0].userToken.toString() == token.toString()) {
                resolve(true);
            }

            resolve(false);
        });
    }

    public getUserById(userId: string): Promise<User> {
        return new Promise(async (resolver, reject) => {
            if (!parseInt(userId)) {
                logger.error(CLIENT_INVALID_USER_ID);
                reject(CLIENT_INVALID_USER_ID);
                return;
            }

            const request = `select * from User where userId = "${userId}";`;
            const result = await this.query(request);

            if (result.length > 1) {
                logger.error(DB_MULTIPLE_USERS_WITH_SAME_ID);
                reject(DB_MULTIPLE_USERS_WITH_SAME_ID);
            }

            const user: User = {
                ...result[0]
            };
            resolver(user);
        });
    }

    public getUserPermissionsIds(userTypeId: string): Promise<string[]> {
        return new Promise(async (resolver, reject) => {
            if (!userTypeId) {
                logger.error(CLIENT_INVALID_USER_TYPE_ID);
                reject(CLIENT_INVALID_USER_TYPE_ID);
                return;
            }

            const request = `select permissionId from UserTypePermissions where userTypeId = "${userTypeId}";`;
            const result = await this.query(request);

            if (!result.length) {
                logger.error(CLIENT_INVALID_USER_TYPE_ID);
                reject(CLIENT_INVALID_USER_TYPE_ID);
                return;   
            }

            const permissionsIds = result.map(permission => permission.permissionId);
            resolver(permissionsIds);
        });
    }

    public getUserPermissions(userId: string): Promise<PermissionsEnum[]> {
        return new Promise(async (resolver, reject) => {
            const user = await this.getUserById(userId);
            const permissionsIds = await this.getUserPermissionsIds(user.userTypeId.toString());
            const permissions = permissionsIds.map(id => {
                return this.getPermissionById(+id);
            });

            resolver(Promise.all(permissions));
        });
    }

    public getUserDataById(userDataId: string): Promise<UserData> {
        return new Promise(async (resolver, reject) => {
            const request = `select * from UserData where userDataId = "${userDataId}";`;
            const result = await this.query(request);

            resolver(result[0]);
        });
    }

    public findUserDataId(login: string, pass: string): Promise<string> {
        return new Promise(async (resolver, reject) => {
            if (!login || !pass) {
                logger.error(CLIENT_INVALID_LOGIN_OR_PASS);
                reject(CLIENT_INVALID_LOGIN_OR_PASS);
                return;
            }

            try {
                const userPass = await this.getUserPass(login);
                const isUserDataValid = await compare(pass, userPass);

                if (isUserDataValid) {
                    const request = `select userDataId from UserData where login = "${login}" and pass = "${userPass}";`;
                    const result = await this.query(request);
                    resolver(result[0].userDataId);

                    return;
                }
            }
            catch (err) {
                logger.error(CLIENT_INVALID_LOGIN_OR_PASS);
                reject(CLIENT_INVALID_LOGIN_OR_PASS);
                return;
            }

            logger.error(CLIENT_INVALID_LOGIN_OR_PASS);
            reject(CLIENT_INVALID_LOGIN_OR_PASS);
            return;
        });
    }

    public findUserByUserDataId(userDataId: string): Promise<User> {
        return new Promise(async (resolver, reject) => {
            if (!userDataId) {
                logger.error(CLIENT_INVALID_USER_DATA_ID);
                reject(CLIENT_INVALID_USER_DATA_ID);
                return;
            }

            const request = `select * from User where userDataId = "${userDataId}";`;
            const result = await this.query(request);

            if (!result.length) {
                logger.error(CLIENT_INVALID_USER_DATA_ID);
                reject(CLIENT_INVALID_USER_DATA_ID);
                return;
            }

            const user: User = {
                ...result[0]
            }

            resolver(user);
        });
    }

    public addUser(admin: User, newUser: User & UserData): Promise<string> {
        return new Promise(async (resolver, reject) => {
            const userToken = getToken(newUser.login, newUser.pass, newUser.userFirstName, newUser.userLastName);
            const userDataId = await this.addUserData({
                login: newUser.login,
                pass: newUser.pass,
                userDataId: null,
                profilePicturePath: newUser.profilePicturePath,
            });
            const userStatusId = await this.getUserStatusId(UserStatusEnum.Active);
            const userTypeId = await this.getUserTypeId(UserTypeEnum.User)

            const request = `insert into User (userToken, userFirstName, userLastName, userPatronymic, userPhoneNumber, userSPhoneNumber, userEmail, userSEmail, userBirthDate, userTypeId, userStatusId, sys_AddedBy, sys_AddedDate, sys_UpdatedDate, sys_UpdatedBy, sys_DeletedBy, sys_DeletedDate, validFrom, validTo, userDataId) values ("${userToken}", "${newUser.userFirstName}", "${newUser.userLastName}", "${newUser.userPatronymic}", "${newUser.userPhoneNumber}", "${newUser.userSPhoneNumber}", "${newUser.userEmail}", "${newUser.userSEmail}", "${newUser.userBirthDate}", ${userTypeId}, ${userStatusId}, ${admin.userId}, "${newUser.sys_AddedDate}", NULL, NULL, NULL, NULL, "${newUser.validFrom}", "${newUser.validTo}", ${userDataId});`;
            await this.query(request);

            const findUserId = `select userId from User where userDataId = "${userDataId}" and userTypeId = "${userTypeId}" and userStatusId = "${userStatusId}";`;
            const result = await this.query(findUserId);

            resolver(result[0].userId);
        });
    }

    public updateUser(admin: User, user: User & UserData): Promise<string> {
        return new Promise(async (resolver, reject) => {
            const userDataId = await this.updateUserData({
                userDataId: user.userDataId,
                login: user.login,
                pass: user.pass,
                profilePicturePath: user.profilePicturePath,
            });
            const request = `update User set userFirstName = "${user.userFirstName}", userLastName = "${user.userLastName}", userPatronymic = "${user.userPatronymic}", userPhoneNumber = "${user.userPhoneNumber}", userSPhoneNumber = "${user.userSPhoneNumber}", userEmail = "${user.userEmail}", userSEmail = "${user.userSEmail}", userBirthDate = "${user.userBirthDate}", userTypeId = "${user.userTypeId}", userStatusId = "${user.userStatusId}", sys_UpdatedDate = "${user.sys_UpdatedDate}", sys_UpdatedBy = "${admin.userId}", validFrom = "${user.validFrom}", validTo = "${user.validTo}", userDataId = "${userDataId}" where userId = "${user.userId}"`;
            await this.query(request);

            const findUserId = `select userId from User where userDataId = "${userDataId}" and userTypeId = "${user.userTypeId}" and userStatusId = "${user.userStatusId}";`;
            const result = await this.query(findUserId);

            resolver(result[0].userId);
        });
    }

    public addUserData(userData: UserData): Promise<string> {
        return new Promise(async (resolver, reject) => {
            const encryptedPass = await encrypt(userData.pass);
            const request = `insert into UserData (login, pass) values ("${userData.login}", "${encryptedPass}");`;
            await this.query(request);
            const findUserDataId = `select userDataId from UserData where login = "${userData.login}";`;
            const result = await this.query(findUserDataId);
            resolver(result[0].userDataId);
        });
    }

    public updateUserData(userData: UserData): Promise<string> {
        return new Promise(async (resolver, reject) => {
            if (userData.pass) {

            }
            const encryptedPass = userData.pass ? await encrypt(userData.pass) : null;
            const request = encryptedPass
                ? `update UserData set login = "${userData.login}", pass = "${encryptedPass}" where userDataId = "${userData.userDataId}";`
                : `update UserData set login = "${userData.login}" where userDataId = "${userData.userDataId}";`;

            await this.query(request);
            const findUserDataId = `select userDataId from UserData where login = "${userData.login}";`;
            const result = await this.query(findUserDataId);
            resolver(result[0].userDataId);
        });
    }

    private async query(sqlQuery: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sqlQuery, (err: string, result: object[]) => {
                if (err) {
                    logger.error(err);
                    reject(err);
                    return;
                }
    
                resolve(result);
            });
        });
    }

    private async getUserPass(userLogin: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const request = `select pass from UserData where login = "${userLogin}";`;
            const result = await this.query(request);

            if (!result.length) {
                reject('');
                return;
            }

            resolve(result[0].pass);
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
