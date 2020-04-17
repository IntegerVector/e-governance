import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlParamsResolverService } from './shared/services/url-params-resolver/url-params-resolver.service';
import { MainPageComponent } from './page-components/components/main-page/main-page.component';
import { UserAuthorizationComponent } from './page-components/components/user-authorization/user-authorization.component';
import { ErrorComponent } from './error/error.component';
import { authorizationMode } from './page-components/components/user-authorization/types/user-authorization-mode.enum';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainPageComponent,
    resolve: {
      urlParams: UrlParamsResolverService
    }
  },
  {
    path: 'log-in',
    component: UserAuthorizationComponent,
    data: {
      mode: authorizationMode.logIn
    },
    resolve: {
      urlParams: UrlParamsResolverService
    }
  },
  {
    path: 'sign-up',
    component: UserAuthorizationComponent,
    data: {
      mode: authorizationMode.signUp
    },
    resolve: {
      urlParams: UrlParamsResolverService
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    resolve: {
      urlParams: UrlParamsResolverService
    }
  },
  {
    path: '**',
    redirectTo: 'error',
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
