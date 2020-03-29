import { RequestTypes } from '../enums/request-type.enum';

export interface BaseRequest {
    type: RequestTypes;
    userToken: string;
    data: any;
}
