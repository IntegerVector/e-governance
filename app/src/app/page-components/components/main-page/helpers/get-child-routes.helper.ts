import { Routes } from '@angular/router';
import { UrlParamsResolverService } from 'src/app/shared/services/url-params-resolver/url-params-resolver.service';
import { MainPageAboutComponent } from '../components/about/about.component';
import { MainPageDocumentsComponent } from '../components/documents/documents.component';
import { DocumentsComponentMode } from '../components/documents/documents-component-mode.enum';

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
        },
        {
            path: 'waiting-documents',
            component: MainPageDocumentsComponent,
            data: {
                mode: DocumentsComponentMode.ActiveDocuments
            },
            resolve: {
                urlParams: UrlParamsResolverService
            }
        },
        {
            path: 'complited-documents',
            component: MainPageDocumentsComponent,
            data: {
                mode: DocumentsComponentMode.CompletedDocuments
            },
            resolve: {
                urlParams: UrlParamsResolverService
            }
        }
    ];
}
