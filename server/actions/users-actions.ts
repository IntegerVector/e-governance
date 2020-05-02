import { RequestTypesEnum } from '../types/enums/request-type.enum';
import { BaseRequest } from '../types/base-request';
import { SQLManagerSingleton } from '../modules/sql-manager';
import { sendErrorInvalidUserId, sendErrorInvalidToken, sendUnexpectedError, sendErrorInvalidPermissions } from './error-handler';
import { CLIENT_INVALID_LOGIN_OR_PASS } from '../constants/errors';
import { PermissionsEnum } from '../types/enums/permissions.enum';
import { UserDTO } from '../types/dto/user-dto';
import { UserDataDTO } from '../types/dto/user-data-dto';
import { normalize } from '../helpers/date-normalizer';
import { USER_DATA_FILES_PATH } from '../constants/constants';

const sql = SQLManagerSingleton.getInstance();

export async function userLogIn(type: RequestTypesEnum, req: any, res: any) {
    if (req.body.type === RequestTypesEnum.get) {
        try {
            const login = req.body.data.login;
            const pass = req.body.data.pass;
            const userDataId = await sql.findUserDataId(login, pass);
            const user = await sql.findUserByUserDataId(userDataId);
            const responce: UserDTO = {
                type,
                data: user,
                userId: user.userId,
                userToken: user.userToken,
                error: null
            };
            res.send(responce);
        }
        catch(err) {
            const responce: UserDTO = {
                type,
                data: null,
                userId: null,
                userToken: null,
                error: {
                    errCode: null,
                    errMsg: CLIENT_INVALID_LOGIN_OR_PASS,
                    errTip: null
                }
            };
            res.send(responce);
        }
    }
}

export async function userRegister(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            const permissions = await sql.getUserPermissions(req.body.userId);

            if (!permissions.find(permission => permission === PermissionsEnum.AddUser)) {
                sendErrorInvalidPermissions(type, req, res);
                return;
            }

            const admin = await sql.getUserById(req.body.userId);
            const userToAdd = {
                ...req.body.data,
                userBirthDate: normalize(req.body.data.userBirthDate),
                sys_AddedDate: normalize('now'),
                sys_UpdatedDate: normalize(req.body.data.sys_UpdatedDate),
                sys_DeletedDate: normalize(req.body.data.sys_DeletedDate),
                validFrom: normalize(req.body.data.validFrom),
                validTo: normalize(req.body.data.validTo),
                profilePicturePath: req.body.data.profilePicturePath || USER_DATA_FILES_PATH
            };
            const newUserId = await sql.addUser(admin, userToAdd);
            const newUser = await sql.getUserById(newUserId);

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: newUser,
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}

export async function userUpdate(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.post) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            const permissions = await sql.getUserPermissions(req.body.userId);

            if (!permissions.find(permission => permission === PermissionsEnum.UpdateUser)) {
                sendErrorInvalidPermissions(type, req, res);
                return;
            }

            const admin = await sql.getUserById(req.body.userId);
            const userToUpdate = {
                ...req.body.data,
                userBirthDate: normalize(req.body.data.userBirthDate),
                sys_AddedDate: normalize(req.body.data.sys_AddedDate),
                sys_UpdatedDate: normalize('now'),
                sys_DeletedDate: normalize(req.body.data.sys_DeletedDate),
                validFrom: normalize(req.body.data.validFrom),
                validTo: normalize(req.body.data.validTo),
                profilePicturePath: req.body.data.profilePicturePath || 'NULL'
            };
            const updatedUserId = await sql.updateUser(admin, userToUpdate);
            const updatedUser = await sql.getUserById(updatedUserId);

            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: updatedUser,
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}

export async function getUserById(type: RequestTypesEnum, req: any, res: any) {
    if (req.body.type === RequestTypesEnum.get) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            if (req.body.userId != req.body.data.userId) {
                const permissions = await sql.getUserPermissions(req.body.userId);

                if (!permissions.find(permission => permission === PermissionsEnum.ReadUsers)) {
                    sendErrorInvalidPermissions(type, req, res);
                    return;
                }
            }
    
            const user = await sql.getUserById(req.body.data.userId);
            const responce: UserDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: user,
                error: null
            }

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}

export async function getUserDataByUserId(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            if (req.body.userId != req.body.data.userId) {
                const permissions = await sql.getUserPermissions(req.body.userId);

                if (!permissions.find(permission => permission === PermissionsEnum.ReadUsers)) {
                    sendErrorInvalidPermissions(type, req, res);
                    return;
                }
            }

            const user = await sql.getUserById(req.body.data.userId);
            const userData = await sql.getUserDataById(user.userDataId.toString());

            const responce: UserDataDTO = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                error: null,
                data: userData
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}

export async function getUserPermissions(type: RequestTypesEnum, req: any, res: any) {
    if (type === RequestTypesEnum.get) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }

            const permissions = await sql.getUserPermissions(req.body.userId);
            const responce: BaseRequest<{ permissions: PermissionsEnum[] }> = {
                userId: req.body.userId,
                userToken: req.body.userToken,
                type: type,
                data: {
                    permissions,
                },
                error: null
            };

            res.send(responce);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}
