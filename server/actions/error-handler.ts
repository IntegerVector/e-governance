import { RequestTypesEnum } from '../types/enums/request-type.enum';
import { NOT_FOUND_CODE, CLIENT_INVALID_USER_ID, CLIENT_NOT_AUTHORIZED_TIP, CLIENT_INVALID_TOKEN, CLIENT_UNEXPECTED_ERROR, CLIENT_UNEXPECTED_ERROR_TIP, CLIENT_INVALID_PERMISSION } from '../constants/errors';

export async function sendError(type: RequestTypesEnum, req: any, res: any) {
    const body = {
        type,
        error: req.body.error,
        data: req.body.error,
        userToken: null,
        userId: null,
    };

    res.send(body);
}

export async function sendUnexpectedError(type: RequestTypesEnum, req: any, res: any) {
    req.body.error = {
        errCode: "",
        errMsg: CLIENT_UNEXPECTED_ERROR,
        errTip: CLIENT_UNEXPECTED_ERROR_TIP
    };

    sendError(type, req, res);
}

export async function sendErrorInvalidUserId(type: RequestTypesEnum, req: any, res: any) {
    req.body.error = {
        errCode: NOT_FOUND_CODE,
        errMsg: CLIENT_INVALID_USER_ID,
        errTip: CLIENT_NOT_AUTHORIZED_TIP
    };

    sendError(type, req, res);
}

export async function sendErrorInvalidToken(type: RequestTypesEnum, req: any, res: any) {
    req.body.error = {
        errCode: NOT_FOUND_CODE,
        errMsg: CLIENT_INVALID_TOKEN,
        errTip: CLIENT_NOT_AUTHORIZED_TIP
    };

    sendError(type, req, res);
}

export async function sendErrorInvalidPermissions(type: RequestTypesEnum, req: any, res: any) {
    req.body.error = {
        errCode: null,
        errMsg: CLIENT_INVALID_PERMISSION,
        errTip: null
    };

    sendError(type, req, res);
}
