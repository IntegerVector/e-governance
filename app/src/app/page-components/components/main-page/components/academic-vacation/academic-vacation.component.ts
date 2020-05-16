import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';

import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';
import { User } from 'src/app/shared/types/dto/user-dto';
import { VacationReasons } from './types/vacation-reasons.enum';
import { getDate } from 'src/app/shared/helpers/date-normalizer';

@Component({
    selector: 'app-academic-vacation',
    templateUrl: './academic-vacation.component.html',
    styleUrls: ['./academic-vacation.component.scss']
})
export class MainPageAcademicVacationComponent implements OnInit {
    @ViewChild('docs') addDocsElement: ElementRef;
    public user: User;
    public  reasons = [
        {
            key: VacationReasons.health,
            text: 'health condition'
        },
        {
            key: VacationReasons.mobility,
            text: 'academic mobility'
        },
        {
            key: VacationReasons.military,
            text: 'military reasons'
        },
        {
            key: VacationReasons.family,
            text: 'family reasons (needs describe)'
        },
        {
            key: VacationReasons.other,
            text: 'other (needs describe)'
        }
    ];

    public formData = {
        courceNumber: 1,
        group: '',
        dateFrom: getDate(new Date()),
        dateTo: null,
        reason: VacationReasons.health,
        reasonDescription: ''
    };

    public documents: File[] = [];

    private userId: string;

    constructor(
        private route: ActivatedRoute,
        private dataSourceService: DataSourceService
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.userId = data.urlParams.userId;

            if (this.userId && this.userId !== DEFAULT_USER_ID) {
                this.setUser(this.userId);
            }
        });
    }

    public addFile(): void {
        this.addDocsElement.nativeElement.click();
    }

    public submit(): void {
        console.log(this.formData);
        this.dataSourceService.requestVacation({
            fromDate: this.formData.dateFrom,
            toDate: this.formData.dateTo,
            reasons: this.formData.reason,
            reasonsDescription: this.formData.reasonDescription,
            userCourceNumber: this.formData.courceNumber,
            userGroup: this.formData.group,
            userId: this.user.userId.toString()
        }).subscribe();
    }

    public validate(): boolean {
        const validity = !!this.formData.courceNumber
            && !!this.formData.group
            && !!this.formData.dateFrom
            && !!this.formData.dateTo
            && !!this.formData.reason;

        return this.formData.reason === VacationReasons.family
                || this.formData.reason === VacationReasons.other
                    ? validity && !!this.formData.reasonDescription
                    : validity;
    }

    public updateDocuments(): void {
        this.documents = _.get(this.addDocsElement, 'nativeElement.files');
        console.log(this.documents);
    }

    private setUser(userId: string): void {
        this.dataSourceService.getUserById(userId).subscribe(user => {
            this.user = user;
        });
    }
}
