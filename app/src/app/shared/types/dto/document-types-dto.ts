import { BaseRequest } from '../base-request';


export type DocumentTypesDTO = BaseRequest<DocumentTypes>;

export type DocumentTypes = {
    documentTypeId: number;
    typeName: string;
};
