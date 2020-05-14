import { RequestTypesEnum } from '../types/enums/request-type.enum';
import { BaseRequest } from '../types/base-request';
import { sendUnexpectedError } from '../modules/error-handler';
import { CLIENT_INVALID_LOGIN_OR_PASS } from '../constants/errors';
import { PermissionsEnum } from '../types/enums/permissions.enum';
import { UserDTO } from '../types/dto/user-dto';
import { UserDataDTO } from '../types/dto/user-data-dto';
import * as dbUsers from '../modules/db-users'; 

export async function userLogIn(type: RequestTypesEnum, req: any, res: any) {
    if (req.body.type === RequestTypesEnum.get) {
        try {
            const user = await dbUsers.userLogIn(
                req.body.data.login,
                req.body.data.pass
            );

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
            const newUser = await dbUsers.userRegister(
                req.body.userId,
                req.body.userToken,
                req.body.data
            );

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
            const updatedUser = await dbUsers.userUpdate(
                req.body.userId,
                req.body.userToken,
                req.body.data
            );

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
            const user = await dbUsers.getUserById(
                req.body.userId,
                req.body.userToken,
                req.body.data.userId
            );

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
            const userData = await dbUsers.getUserDataByUserId(
                req.body.userId,
                req.body.userToken,
                req.body.data.userId
            );

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

            const permissions = await dbUsers.getUserPermissions(req.body.userId);
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
