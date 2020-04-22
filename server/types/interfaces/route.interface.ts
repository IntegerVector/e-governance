import { RequestTypesEnum } from "../enums/request-type.enum";

export interface RouteInterface {
    type: RequestTypesEnum,
    url: string,
    action: string
}
