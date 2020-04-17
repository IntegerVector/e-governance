import { RequestTypes } from "./enums/request-type.enum";
import { ErrorObjectInterface } from './interfaces/error0object.interface';

export type BaseRequest<T> = {
    type: RequestTypes;
    userId: number;
    userToken: string;
    data: T;
    error?: ErrorObjectInterface
};
