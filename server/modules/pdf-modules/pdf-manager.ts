import * as pdf from 'pdf-creator-node';
import { User } from '../../types/dto/user-dto';
import { resolve } from 'path';
import { ROOT, DOCUMENTS_FILES_PATH } from '../../constants/constants';
import { getFileName } from '../../helpers/get-file-name';

export async function createPDF(template: string, data: any, user: User): Promise<any> {
    const params = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm"
        }
    };

    const fileName = getFileName();
    const path = resolve(ROOT + DOCUMENTS_FILES_PATH, fileName + '.pdf');

    const document = {
        html: template,
        data,
        path
    };

    return pdf.create(document, params);
}
