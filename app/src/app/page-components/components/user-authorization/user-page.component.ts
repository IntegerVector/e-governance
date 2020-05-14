import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'lodash';

import { ErrorHandlerService } from 'src/app/error/services/error-handler.service';
import { UserPageMode } from './types/user-page-mode.enum';
import { User } from 'src/app/shared/types/dto/user-dto';
import { UserPageBaseStrategy } from './services/strategies/user-page-base-strategy.interface';
import { GetUserPageStrategyService } from './services/get-user-page-strategy.service';
import { UserData } from 'src/app/shared/types/dto/user-data-dto';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';
import { DataSaverService } from 'src/app/shared/services/data-saver/data-saver.service';
import { MAIN_PAGE_INTERNAL_URL } from 'src/app/shared/constants/internal-urls.constants';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { UserStatusEnum } from 'src/app/shared/types/dto/user-status-dto';
import { UserType } from 'src/app/shared/types/dto/user-type-dto';
import { UserTypeEnum } from 'src/app/shared/types/enums/user-type.enum';
import { NotificationsService } from '../notification/services/notifications.service';
import { NotificationType } from '../notification/types/notification-type.enum';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
    @Input() mode: UserPageMode;

    public viewerUserId: string;
    public user: User = {} as any;
    public userData: UserData = {} as any;
    public rememberMe: boolean;
    public isAdmin: boolean;
    public userTypes: UserType[];
    public userStatuses: UserStatusEnum[];

    private strategy: UserPageBaseStrategy = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private errorHandlerService: ErrorHandlerService,
        private getUserPageStrategyService: GetUserPageStrategyService,
        private dataSaverService: DataSaverService,
        private dataSourceService: DataSourceService,
        private notificationsService: NotificationsService
    ) {}

    public ngOnInit(): void {
        this.dataSourceService.getUsersTypes().subscribe(data => {
            this.userTypes = data;
        });

        this.dataSourceService.getUserStatuses().subscribe(data => {
            this.userStatuses = data;
        });

        this.route.data.subscribe(data => {
            this.mode = data.mode;
            this.rememberMe = this.dataSaverService.getUserData() ? true : false;
            this.viewerUserId = this.dataSourceService.getId();

            this.strategy = this.getUserPageStrategyService.getStrategy(data.mode);
            if (this.viewerUserId && this.viewerUserId !== DEFAULT_USER_ID) {
                this.setUser(get(data, 'urlParams.userId'));
                this.setUserData(get(data, 'urlParams.userId'));
            }

            if (get(data, 'urlParams.error.errCode') ||
                get(data, 'urlParams.error.errMsg') ||
                get(data, 'urlParams.error.errTip')
            ) {
                this.errorHandlerService.navigateToErrPage(data.urlParams.error);
            }
        });
    }

    public submit(): void {
        this.strategy.submit({ ...this.user, ...this.userData }).subscribe(user => {
            if (user) {
                this.notificationsService.push('Success', NotificationType.Success);
            } else {
                return;
            }

            if (this.rememberMe) {
                this.dataSaverService.saveUserData({
                    userId: user.userId.toString(),
                    userToken: this.dataSourceService.getTokenById(user.userId.toString())
                });
            }

            this.router.navigate([MAIN_PAGE_INTERNAL_URL], {
                queryParams: {
                    userId: user.userId.toString()
                }
            });
        });
    }

    public logOut(): void {
        this.dataSaverService.clearUserData();
        this.dataSourceService.signOut();
        this.router.navigate(['/log-in']);
    }

    public getUserStatus(userStatuseId: number): string {
        return this.userStatuses.find(status => {
            return status.userStatusId === userStatuseId;
        }).status;
    }

    private setUser(userId: string): void {
        const userObs = this.strategy.getUser(userId);
        if (userObs) {
            userObs.subscribe(user => {
                this.user = user;
                const userType = this.userTypes.find(type => {
                    return type.userTypeId === user.userTypeId;
                }).type;
                this.isAdmin = userType === UserTypeEnum.Administrator;
            });
        }
    }

    private setUserData(userId: string): void {
        const userDataObs = this.strategy.getUserData(userId);
        if (userDataObs) {
            userDataObs.subscribe(userData => {
                this.userData = userData;
            });
        }
    }
}
