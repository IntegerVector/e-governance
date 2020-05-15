import { Routes } from '@angular/router';
import { UrlParamsResolverService } from 'src/app/shared/services/url-params-resolver/url-params-resolver.service';
import { MainPageAboutComponent } from '../components/about/about.component';
import { MainPageDocumentsComponent } from '../components/documents/documents.component';
import { DocumentsComponentMode } from '../components/documents/documents-component-mode.enum';
import { MainPageAcademicVacationComponent } from '../components/academic-vacation/academic-vacation.component';
import {
    MAIN_PAGE_ABOUT,
    MAIN_PAGE_WAITING_DOCUMENTS,
    MAIN_PAGE_COMLITED_DOCUMENTS,
    MAIN_PAGE_ACADEMIC_VACATION
} from 'src/app/shared/constants/internal-urls.constants';

export function getChildRoutes(): Routes {
    return [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: MAIN_PAGE_ABOUT
        },
        {
            path: MAIN_PAGE_ABOUT,
            component: MainPageAboutComponent,
            resolve: {
                urlParams: UrlParamsResolverService
            }
        },
        {
            path: MAIN_PAGE_WAITING_DOCUMENTS,
            component: MainPageDocumentsComponent,
            data: {
                mode: DocumentsComponentMode.ActiveDocuments
            },
            resolve: {
                urlParams: UrlParamsResolverService
            }
        },
        {
            path: MAIN_PAGE_COMLITED_DOCUMENTS,
            component: MainPageDocumentsComponent,
            data: {
                mode: DocumentsComponentMode.CompletedDocuments
            },
            resolve: {
                urlParams: UrlParamsResolverService
            }
        },
        {
            path: MAIN_PAGE_ACADEMIC_VACATION,
            component: MainPageAcademicVacationComponent,
            resolve: {
                urlParams: UrlParamsResolverService
            }
        }
    ];
}
