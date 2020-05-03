import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
    headerLabel,
    headerTitle,
    sectionHeaderLabel,
    sectionPDefaultText,
    sectionText,
    sectionPTextTemplate
} from '../main-page.constants';
import { User } from 'src/app/shared/types/dto/user-dto';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { ErrorHandlerService } from 'src/app/error/services/error-handler.service';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';

@Component({
    selector: 'app-main-page-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class MainPageAboutComponent implements OnInit {
    public headerLabel = headerLabel;
    public headerTitle = headerTitle;
    public sectionHLabel = sectionHeaderLabel;
    public sectionPText = sectionPDefaultText;
    public sectionText = sectionText;

    public user: User = {
         userFirstName: '',
         userLastName: ''
    } as any;

    constructor(
        private route: ActivatedRoute,
        private dataSourceService: DataSourceService,
        private errorHandlerService: ErrorHandlerService
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe(({ urlParams }) => {
            this.setSectionPText(urlParams.userId);

            if (urlParams.error.errCode ||
                urlParams.error.errMsg ||
                urlParams.error.errTip
            ) {
                this.errorHandlerService.navigateToErrPage(urlParams.error);
            }
        });
    }

    private setSectionPText(userId: string): void {
        if (userId === DEFAULT_USER_ID) {
            this.sectionPText = sectionPDefaultText;
            return;
        }

        this.dataSourceService.getUserById(userId).subscribe(user => {
            this.user = user;
            this.sectionPText = sectionPTextTemplate;
        });
    }
}
