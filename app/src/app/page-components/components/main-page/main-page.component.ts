import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UrlParamsInterface } from 'src/app/shared/services/url-params-resolver/types/url-params.interface';
import { ErrorHandlerService } from 'src/app/error/services/error-handler.service';
import {
    headerLabel,
    headerTitle,
    sectionHeaderLabel,
    sectionPTextTemplate,
    sectionPDefaultText,
    sectionText
} from './main-page.constants';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';
import { User } from 'src/app/shared/types/dto/user-dto';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
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
