import * as fs from 'fs';
import * as _ from 'lodash';
import { resolve } from 'path';
import { SQLManagerSingleton } from './db-modules/sql-manager';
import { ROOT, DOCUMENTS_FILES_PATH } from '../constants/constants';
import { toLocalDate, getDate } from '../helpers/date-normalizer';
import { createPDF } from './pdf-modules/pdf-manager';

const sql = SQLManagerSingleton.getInstance();

export enum VacationReasons {
    health = 'H',
    mobility = 'AM',
    military = 'M',
    family = 'F',
    other = 'O'
}

export interface AcademicVacationParamsInterface {
    userCourceNumber: number;
    userGroup: string;
    userId: string;
    fromDate: string;
    toDate: string;
    reasons: VacationReasons;
    reasonsDescription: string;
};

export async function requestAcademicVacation(
    options: AcademicVacationParamsInterface
): Promise<string> {
    const user = await sql.getUserById(options.userId);
    const targetUser = await sql.getUserById('11');
    const templatePath = resolve(ROOT + DOCUMENTS_FILES_PATH, 'acad_vacation_template.html');
    const html = fs.readFileSync(templatePath, 'utf8');
    const data = {
        ...options,
        fullUnivercityName: 'Харківського Національного Університету Радіоелектроніки',
        userLastName: user.userLastName,
        userFirstName: user.userFirstName,
        userPatronymic: user.userPatronymic,
        targetLastName: targetUser.userLastName,
        targetFirstName: targetUser.userFirstName,
        targetPatronymic: targetUser.userPatronymic,
        fromDate: toLocalDate(options.fromDate),
        toDate: toLocalDate(options.toDate),
        date: toLocalDate(getDate(new Date())),
        reasons: getReasonsText(options.reasons, options.reasonsDescription)
    };

    return createPDF(html, data, user);
}

function getReasonsText(reason: VacationReasons, description: string): string {
    switch(reason) {
        case VacationReasons.health: return 'за станом здоров\'я';
        case VacationReasons.mobility: return 'через академічну мобільність';
        case VacationReasons.military: return 'через необхідність ведення військової служби';
        case VacationReasons.family: return `за сімейними обставинами. ${_.capitalize(description)}`;
        case VacationReasons.other: return `${_.lowerCase(description)}`;
    }
}
