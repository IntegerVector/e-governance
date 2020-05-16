import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import {
    CLIENT_UNEXPECTED_ERROR,
    CLIENT_UNEXPECTED_ERROR_TIP,
    CLIENT_INVALID_PERMISSION
} from '../../constants/errors';

export async function sendError(type: RequestTypesEnum, req: any, res: any) {
    const body = {
        type,
        error: req.body.error,
        data: null,
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

export async function sendErrorInvalidPermissions(type: RequestTypesEnum, req: any, res: any) {
    req.body.error = {
        errCode: null,
        errMsg: CLIENT_INVALID_PERMISSION,
        errTip: null
    };

    sendError(type, req, res);
}
