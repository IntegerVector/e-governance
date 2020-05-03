import { Routes } from '@angular/router';
import { UrlParamsResolverService } from 'src/app/shared/services/url-params-resolver/url-params-resolver.service';
import { MainPageAboutComponent } from '../components/about.component';

export function getChildRoutes(): Routes {
    return [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'about'
        },
        {
            path: 'about',
            component: MainPageAboutComponent,
            resolve: {
                urlParams: UrlParamsResolverService
            }
        }
    ];
}
