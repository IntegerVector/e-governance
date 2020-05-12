import * as bcrypt from 'bcrypt';

import { LoggerSingleton } from './logger';

const logger = LoggerSingleton.getInstance();
const SALT = 8;

export async function encrypt(pass: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, SALT, (err, encrypted) => {
            if (encrypted) {
                resolve(encrypted);
                return;
            }

            if (err) {
                logger.error('Error while password incrypton');
                reject(err);
                return;
            }
        });
    });
}

export async function compare(userPass: string, dbPassword): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(userPass, dbPassword, (err, res) => {
            if (err || !res) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}
