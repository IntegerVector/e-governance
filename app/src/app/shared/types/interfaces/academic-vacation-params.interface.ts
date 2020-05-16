import { VacationReasons } from 'src/app/page-components/components/main-page/components/academic-vacation/types/vacation-reasons.enum';

export interface AcademicVacationParamsInterface {
    userId: string;
    userCourceNumber: number;
    userGroup: string;
    fromDate: string;
    toDate: string;
    reasons: VacationReasons;
    reasonsDescription: string;
}
