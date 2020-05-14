import { RequestTypesEnum } from "./enums/request-type.enum";
import { ErrorObjectInterface } from './interfaces/error0bject.interface';

export type BaseRequest<T> = {
    type: RequestTypesEnum;
    userId: number;
    userToken: string;
    data: T;
    error?: ErrorObjectInterface
};
