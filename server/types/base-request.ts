import { RequestTypes } from "./enums/request-type.enum";

export type BaseRequest<T> = {
    type: RequestTypes;
    userId: number;
    userToken: string;
    data: T;
};
