import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlParamsResolverService } from './shared/services/url-params-resolver/url-params-resolver.service';
import { MainPageComponent } from './page-components/components/main-page/main-page.component';
import { UserPageComponent } from './page-components/components/user-authorization/user-page.component';
import { ErrorComponent } from './error/error.component';
import { UserPageMode } from './page-components/components/user-authorization/types/user-page-mode.enum';
import {
    MAIN_PAGE_INTERNAL_URL,
    ERROR_PAGE_INTERNAL_URL,
    LOG_IN_INTERNAL_URL,
    SIGN_UP_INTERNAL_URL,
    PROFILE_INTERNAL_URL
} from './shared/constants/internal-urls.constants';
import { getChildRoutes } from './page-components/components/main-page/helpers/get-child-routes.helper';


const routes: Routes = [
    {
        path: '',
        redirectTo: MAIN_PAGE_INTERNAL_URL,
        pathMatch: 'full'
    },
    {
        path: MAIN_PAGE_INTERNAL_URL,
        component: MainPageComponent,
        resolve: {
            urlParams: UrlParamsResolverService
        },
        children: getChildRoutes()
    },
    {
        path: LOG_IN_INTERNAL_URL,
        component: UserPageComponent,
        data: {
            mode: UserPageMode.logIn
        },
        resolve: {
            urlParams: UrlParamsResolverService
        }
    },
    {
        path: SIGN_UP_INTERNAL_URL,
        component: UserPageComponent,
        data: {
            mode: UserPageMode.signUp
        },
        resolve: {
            urlParams: UrlParamsResolverService
        }
    },
    {
        path: PROFILE_INTERNAL_URL,
        component: UserPageComponent,
        data: {
            mode: UserPageMode.viewAndUpdate
        },
        resolve: {
            urlParams: UrlParamsResolverService
        }
    },
    {
        path: ERROR_PAGE_INTERNAL_URL,
        component: ErrorComponent,
        resolve: {
            urlParams: UrlParamsResolverService
        }
    },
    {
        path: '**',
        redirectTo: ERROR_PAGE_INTERNAL_URL,
        resolve: {
            urlParams: {
                errCode: '404',
                errMsg: 'Page Not Found',
                errTip: 'Try to navigate to the main page'
            }
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
