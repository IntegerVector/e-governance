import * as fs from 'fs';
import { resolve } from 'path';
import { ROOT, DOCUMENTS_FILES_PATH } from '../../constants/constants';
import { getFileName } from '../../helpers/get-file-name';

export async function getPDFFile(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(data.toString());
        });
    });
}

export async function addPDFFile(file): Promise<string> {
    const fileName = getFileName();
    const path = resolve(ROOT + DOCUMENTS_FILES_PATH, fileName);

    return new Promise<string>((resolve, reject) => {
        fs.writeFile(path, file, () => {
            resolve(path);
        })
    });
}
