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
            height: "45mm",
            contents: `<div style="text-align: center;">Author: ${user.userFirstName} ${user.userLastName}</div>`
        },
        "footer": {
            "height": "28mm",
            "contents": {
            first: 'Cover page',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last: 'Last Page'
            }
        }
    };

    const fileName = getFileName();
    const path = resolve(DOCUMENTS_FILES_PATH, fileName);

    const document = {
        html: template,
        data,
        path: './out.pdf'
    };

    return pdf.create(document, params);
}
