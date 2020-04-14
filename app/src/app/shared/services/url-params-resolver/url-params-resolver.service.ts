import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UrlParamsInterface } from './types/url-params.interface';
import { DataSourceService } from '../data-source/data-source.service';
import { ErrorHandlerService } from 'src/app/error/services/error-handler.service';
import { DEFAULT_USER_TOKEN, DEFAULT_USER_ID } from '../../shared.constants';

@Injectable({
    providedIn: 'root'
})
export class UrlParamsResolverService implements Resolve<UrlParamsInterface> {
    private defaultParams: UrlParamsInterface = {
        userId: DEFAULT_USER_ID,
        userToken: DEFAULT_USER_TOKEN
    };

    constructor(private dataSourceService: DataSourceService) {}

    public resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<UrlParamsInterface> {
        return this.dataSourceService.isUserIdValid(route.queryParams.userId)
            ? this.getParamsObservable(route)
            : this.getDefaultParamsObservable(route);
    }

    private getParamsObservable(route: ActivatedRouteSnapshot): Observable<UrlParamsInterface> {
        return of({
            userId: route.queryParams.userId,
            userToken: this.dataSourceService.getTokenById(route.queryParams.userId),
            error: {
                errCode: route.queryParams.errCode || null,
                errMsg: route.queryParams.errMsg || null,
                errTip: route.queryParams.errTip || null
            }
        });
    }

    private getDefaultParamsObservable(route: ActivatedRouteSnapshot): Observable<UrlParamsInterface> {
        return of({
            ...this.defaultParams,
            error: {
                errCode: route.queryParams.errCode || null,
                errMsg: route.queryParams.errMsg || null,
                errTip: route.queryParams.errTip || null
            }
        });
    }
}
