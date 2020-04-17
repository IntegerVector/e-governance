import { RequestTypes } from './enums/request-type.enum';
import { ErrorObjectInterface } from 'src/app/error/types/error-object.interface';

export type BaseRequest<T> = {
    type: RequestTypes;
    userId: number;
    userToken: string;
    error?: ErrorObjectInterface
    data: T;
};
