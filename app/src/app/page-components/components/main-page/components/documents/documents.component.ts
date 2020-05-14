import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';
import { DocumentsComponentMode } from './documents-component-mode.enum';
import { UsersDocuments } from 'src/app/shared/types/dto/users-documents-dto';
import { Observable } from 'rxjs';

@Component({
    selector: '<app-main-page-documents>',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class MainPageDocumentsComponent implements OnInit {
    public documents: UsersDocuments[];

    private mode: DocumentsComponentMode;
    private userId: string;
    private userDataId: string;

    constructor(
        private route: ActivatedRoute,
        private dataSourceService: DataSourceService
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.mode = data.mode;
            this.userId = data.urlParams.userId;
            console.log(this.mode);

            if (this.userId && this.userId !== DEFAULT_USER_ID) {
                this.setUserDataId();
            }
        });
    }

    private setUserDataId(): void {
        this.dataSourceService.getUserById(this.userId).subscribe(user => {
            this.userDataId = user.userDataId.toString();

            if (this.userDataId) {
                this.setUsersDocuments();
            }
        });
    }

    private setUsersDocuments(): void {
        this.getUsersDocmentsObservable().subscribe(documents => {
            this.documents = documents;
            console.log(documents);
        });
    }

    private getUsersDocmentsObservable(): Observable<UsersDocuments[]> {
        switch (this.mode) {
            case DocumentsComponentMode.ActiveDocuments:
                return this.dataSourceService.getUserActiveDocuments(this.userDataId);
            case DocumentsComponentMode.CompletedDocuments:
                return this.dataSourceService.getUserInactiveDocuments(this.userDataId);
            default:
                return this.dataSourceService.getUserDocuments(this.userDataId);
        }
    }
}
