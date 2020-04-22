import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataSourceService } from './shared/services/data-source/data-source.service';
import { MAIN_PAGE_INTERNAL_URL } from './shared/constants/internal-urls.constants';
import { DEFAULT_USER_ID } from './shared/constants/shared.constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public userId: string;

    constructor(
        private dataSourceService: DataSourceService,
        private router: Router
    ) {
        const { userId, userToken } = this.dataSourceService.restoreUserAuthData();
        this.userId = userId || DEFAULT_USER_ID;
        this.router.navigate([MAIN_PAGE_INTERNAL_URL], {
            queryParams: {
                userId
            }
        });
    }
}
