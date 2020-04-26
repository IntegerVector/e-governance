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
        this.dataSourceService.subscribeToUserIdChanges(userId => {
            if (userId !== this.userId) {
                this.userId = userId || DEFAULT_USER_ID;
            }
        });

        const restoredUserData = this.dataSourceService.restoreUserAuthData();
        this.router.navigate([MAIN_PAGE_INTERNAL_URL], {
            queryParams: {
                userId: restoredUserData.userId
            }
        });
    }
}
