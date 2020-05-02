import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription, Subscriber } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { get } from 'lodash';

import {
    getUserDataUrl,
    userLogInUrl,
    userRegisterUrl,
    userUpdateUrl,
    getUserDataByUserIdUrl,
    getUserPermissionsUrl,
    getUsersTypesUrl,
    getUserStatusesUrl
} from './constants/urls';
import { UserDTO, User } from '../../types/dto/user-dto';
import { BaseRequest } from '../../types/base-request';
import { RequestTypesEnum } from '../../types/enums/request-type.enum';
import { DEFAULT_USER_ID, DEFAULT_USER_TOKEN } from '../../constants/shared.constants';
import { ErrorHandlerService } from 'src/app/error/services/error-handler.service';
import { ErrorObjectInterface } from 'src/app/error/types/error-object.interface';
import { UserData } from '../../types/dto/user-data-dto';
import { PermissionsEnum } from '../../types/enums/permissions.enum';
import { DataSaverService } from '../data-saver/data-saver.service';
import { UserDataInterface } from '../data-saver/types/user-data.interface';
import { UserType } from '../../types/dto/user-type-dto';
import { UserStatusEnum } from '../../types/dto/user-status-dto';
import { NotificationsService } from 'src/app/page-components/components/notification/services/notifications.service';
import { NotificationType } from 'src/app/page-components/components/notification/types/notification-type.enum';

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {
    private userId: string = null;
    private userTocken: string = null;
    private lastError: ErrorObjectInterface = {
        errCode: null,
        errMsg: null,
        errTip: null
    };
    private userTypes: UserType[];
    private userStatuses: UserStatusEnum[];

    private userIdObservable = new Observable(subscriber => {
        subscriber.next(DEFAULT_USER_ID);
        this.userIdSubscriber = subscriber;
    });
    private userIdSubscriber: Subscriber<string>;

    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
        private dataSaverService: DataSaverService,
        private notificationsService: NotificationsService
    ) { }

    public restoreUserAuthData(): UserDataInterface {
        const userAuthData = this.dataSaverService.getUserData();
        this.userId = get(userAuthData, 'userId') || DEFAULT_USER_ID;
        this.userTocken = get(userAuthData, 'userToken') || DEFAULT_USER_TOKEN;

        if (this.userIdSubscriber) {
            this.userIdSubscriber.next(this.userId);
        }

        return {
            userId: this.userId,
            userToken: this.userTocken
        };
    }

    public isUserIdValid(userId: string): boolean {
        if (!userId || userId === DEFAULT_USER_ID) {
            return false;
        }

        return true;
    }

    public getId(): string {
        return this.userId;
    }

    public subscribeToUserIdChanges(action: (userId: string) => void): Subscription {
        return this.userIdObservable.subscribe(action);
    }

    public getTokenById(userId: string): string {
        return userId === this.userId ? this.userTocken : null;
    }

    public getUserById(userId): Observable<User> {
        const requestData = { userId };

        return this.get(getUserDataUrl, requestData);
    }

    public getUsersTypes(): Observable<UserType[]> {
        if (this.userTypes) {
            return of(this.userTypes);
        }

        return this.get(getUsersTypesUrl, null)
            .pipe(
                map(data => data.types),
                tap(data => this.userTypes = data)
            );
    }

    public getUserStatuses(): Observable<UserStatusEnum[]> {
        if (this.userStatuses) {
            return of(this.userStatuses);
        }

        return this.get(getUserStatusesUrl, null)
            .pipe(
                map(data => data.statuses),
                tap(data => this.userStatuses = data)
            );
    }

    public getUserDataByUserId(userId: string): Observable<UserData> {
        const requestData = { userId };

        return this.get(getUserDataByUserIdUrl, requestData);
    }

    public getPermissions(userId: string): Observable<PermissionsEnum[]> {
        return this.get(getUserPermissionsUrl, null).pipe(map(data => data.permissions));
    }

    public signIn(userAuthData: { login: string; pass: string }): Observable<User> {
        return this.get(userLogInUrl, userAuthData);
    }

    public signOut(): void {
        this.userId = null;
        this.userTocken = null;
        if (this.userIdSubscriber) {
            this.userIdSubscriber.next(DEFAULT_USER_ID);
        }
    }

    public registerNewUser(user: User & UserData): Observable<User> {
        return this.post(userRegisterUrl, user);
    }

    public updateUser(user: User & UserData): Observable<User> {
        return this.post(userUpdateUrl, user);
    }

    private post(url: string, requestData: any): Observable<any> {
        const body: BaseRequest<any> = {
            userId: +this.userId,
            userToken: this.getTokenById(this.userId),
            type: RequestTypesEnum.post,
            data: requestData
        };

        return this.makeRequest(url, body);
    }

    private get(url: string, requestData: any): Observable<any> {
        const body: BaseRequest<any> = {
            userId: +this.userId,
            userToken: this.getTokenById(this.userId),
            type: RequestTypesEnum.get,
            data: requestData
        };

        return this.makeRequest(url, body);
    }

    private makeRequest(url: string, body: BaseRequest<any>): Observable<any> {
        return this.http.post(url, body).pipe(
            tap((data: BaseRequest<any>) => this.updateUserAuthData(data.userId, data.userToken)),
            tap((data: BaseRequest<any>) => this.customErrorCheck(data)),
            catchError(this.errorHandler.bind(this)),
            map(this.mapResponce.bind(this))
        );
    }

    private updateUserAuthData(userId: number, userToken: string): void {
        if (!userToken || !userId) {
            return;
        }

        this.userId = userId.toString();
        this.userTocken = userToken;

        if (this.userIdSubscriber) {
            this.userIdSubscriber.next(this.userId);
        }
    }

    private errorHandler(err: any, caught: BaseRequest<any>): Observable<BaseRequest<void>> {
        if (!this.isUserIdValid(this.userId)) {
            return;
        }

        this.lastError.errCode = err.status;
        this.lastError.errMsg = err.statusText;
        this.lastError.errTip = err.message;

        this.errorHandlerService.navigateToErrPage(this.lastError);

        return of({
            ...caught,
            userId: +this.userId,
            userToken: this.userTocken,
            error: this.lastError
        });
    }

    private customErrorCheck(data: BaseRequest<any>): void {
        if (data.error) {
            this.notificationsService.push(data.error.errMsg || 'Unexpected Error', NotificationType.Error);
        }
    }

    private mapResponce(data: BaseRequest<any>): any {
        return data.data;
    }
}
