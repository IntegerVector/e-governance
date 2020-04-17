import { RequestTypes } from '../types/enums/request-type.enum';
import { BaseRequest } from '../types/base-request';
import { SQLManagerSingleton } from '../modules/sql-manager';
import { sendErrorInvalidUserId, sendErrorInvalidToken, sendUnexpectedError, sendErrorInvalidPermissions } from './error-handler';
import { CLIENT_INVALID_LOGIN_OR_PASS } from '../constants/errors';
import { Permissions } from '../types/enums/permissions.enum';

const sql = SQLManagerSingleton.getInstance();

export async function userLogIn(type: RequestTypes, req: any, res: any) {
    if (req.body.type === RequestTypes.get) {
        try {
            const login = req.body.data.login;
            const pass = req.body.data.pass;
            const userDataId = await sql.findUserDataId(login, pass);
            const user = await sql.findUserByUserDataId(userDataId);
            const responce: BaseRequest<void> = {
                type,
                data: null,
                userId: user.userId,
                userToken: user.userToken,
                error: null
            };
            res.send(responce);
        }
        catch(err) {
            const responce: BaseRequest<void> = {
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

export async function userRegister(type: RequestTypes, req: any, res: any) {
    if (type === RequestTypes.post) {
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

            if (!permissions.find(permission => permission === Permissions.AddUser)) {
                sendErrorInvalidPermissions(type, req, res);
                return;
            }

            const admin = await sql.getUserById(req.body.userId);
            const newUserId = await sql.addUser(admin, req.body.data);

            const responce: BaseRequest<{ userId: string }> = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: {
                    userId: newUserId
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

export async function userUpdate(type: RequestTypes, req: any, res: any) {
    if (type === RequestTypes.post) {
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

            if (!permissions.find(permission => permission === Permissions.UpdateUser)) {
                sendErrorInvalidPermissions(type, req, res);
                return;
            }

            const admin = await sql.getUserById(req.body.userId);
            const updatedUserId = await sql.updateUser(admin, req.body.data);

            const responce: BaseRequest<{ userId: string }> = {
                type,
                userId: req.body.userId,
                userToken: req.body.userToken,
                data: {
                    userId: updatedUserId
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

export async function getUserById(type: RequestTypes, req: any, res: any) {
    if (req.body.type === RequestTypes.get) {
        try {
            if (!await sql.checkUserId(req.body.userId)) {
                sendErrorInvalidUserId(type, req,  res);
                return;
            }
    
            if (!await sql.checkToken(req.body.userId, req.body.userToken)) {
                sendErrorInvalidToken(type, req, res);
                return;
            }
    
            sql.getUserById(req.body.userId);
        }
        catch(err) {
            sendUnexpectedError(type, req, res);
        }
    }
}

export async function getUserPermissions(type: RequestTypes, req: any, res: any) {
    if (type === RequestTypes.get) {
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
            const responce: BaseRequest<{ permissions: Permissions[] }> = {
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
