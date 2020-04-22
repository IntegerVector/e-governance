import { Injectable } from '@angular/core';

import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DataSaverService } from 'src/app/shared/services/data-saver/data-saver.service';
import { UserPageMode } from '../types/user-page-mode.enum';
import { UserPageBaseStrategy } from './strategies/user-page-base-strategy.interface';
import { UserPageSignInStrategy } from './strategies/user-page-sign-in-strategy';
import { UserPageSighUpStrategy } from './strategies/user-page-sign-up-strategy';
import { UserPageViewAndUpdateStrategy } from './strategies/user-page-view-and-update-strategy';

@Injectable({
    providedIn: 'root'
})
export class GetUserPageStrategyService {
    constructor(
        private dataSourceService: DataSourceService,
        private dataSaverService: DataSaverService
    ) {}

    public getStrategy(mode: UserPageMode): UserPageBaseStrategy {
        switch (mode) {
            case UserPageMode.logIn:
                return new UserPageSignInStrategy(this.dataSourceService, this.dataSaverService);
            case UserPageMode.signUp:
                return new UserPageSighUpStrategy(this.dataSourceService, this.dataSaverService);
            case UserPageMode.viewAndUpdate:
                return new UserPageViewAndUpdateStrategy(this.dataSourceService, this.dataSaverService);
            default:
                return null;
        }
    }
}
