import { RequestTypes } from "../enums/request-type.enum";

export interface Route {
    type: RequestTypes,
    url: string,
    action: string
}
