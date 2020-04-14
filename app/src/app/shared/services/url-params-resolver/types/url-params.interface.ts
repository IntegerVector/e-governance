import { ErrorObjectInterface } from 'src/app/error/types/error-object.interface';

export interface UrlParamsInterface {
    userId: string;
    userToken: string;
    error?: ErrorObjectInterface;
}
