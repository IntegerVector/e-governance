import { Injectable, NgModuleFactoryLoader } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { PanelOptionsDTO, PanelOptions } from '../../types/dto/panel-options-dto';
import { getUserData } from './constants/urls';
import { UserDTO, User } from '../../types/dto/user-dto';
import { BaseRequest } from '../../types/base-request';
import { RequestTypes } from '../../types/enums/request-type.enum';
import { DEFAULT_USER_ID, DEFAULT_USER_TOKEN } from '../../shared.constants';
import { ErrorHandlerService } from 'src/app/error/services/error-handler.service';
import { ErrorObjectInterface } from 'src/app/error/types/error-object.interface';
import { unknownErrorTip } from 'src/app/error/error.constants';

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

  // To delete:
  private panelOptionsMock: PanelOptions = {
    left: [
      {
        title: 'Test',
        url: 'test'
      }
    ],
    center: {
      iconUrl: 'icon-url',
      label: 'Main Page',
      url: '/'
    },
    right: {
      buttons: [
        {
          title: 'Just Mock button',
          url: 'fuck'
        }
      ],
      user: {
        avatarUrl: 'user-avatar',
        mainLabel: 'Fuck, You',
        subLabel: 'some sub data'
      }
    }
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  public isUserIdValid(userId: string): boolean {
    if (!this.userId) {
      return false;
    }

    return userId === this.userId ? true : false;
  }

  public getTokenById(userId: string): string {
    return userId === this.userId ? this.userTocken : null;
  }

  public getPanelOptions(): Observable<any> {
    return of(this.panelOptionsMock);
  }

  public getUserById(userId): Observable<User> {
    const requestData = { userId };

    return this.get(getUserData, requestData);
  }

  private post(url: string, requestData: any): Observable<any> {
    const body: BaseRequest<any> = {
      userId: +this.userId,
      userToken: this.getTokenById(this.userId),
      type: RequestTypes.post,
      data: requestData
    };

    return this.makeRequest(url, body);
  }

  private get(url: string, requestData: any): Observable<any> {
    const body: BaseRequest<any> = {
      userId: +this.userId,
      userToken: this.getTokenById(this.userId),
      type: RequestTypes.get,
      data: requestData
    };

    return this.makeRequest(url, body);
  }

  private makeRequest(url: string, body: BaseRequest<any>): Observable<any> {
    return this.http.post(url, body).pipe(
      tap((data: UserDTO) => this.updateUserData(data.userId, data.userToken)),
      catchError(this.errorHandler.bind(this)),
      map(this.mapResponce.bind(this))
    );
  }

  private updateUserData(userId: number, userToken: string): void {
    this.userId = userId.toString() || DEFAULT_USER_ID;
    this.userTocken = userToken || DEFAULT_USER_TOKEN;
  }

  private errorHandler(err: any, caught: BaseRequest<any>): Observable<BaseRequest<void>> {
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

  private mapResponce(data: BaseRequest<any>): any {
    return data.data;
  }
}
