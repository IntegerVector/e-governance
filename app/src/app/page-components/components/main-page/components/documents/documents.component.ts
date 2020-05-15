import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';
import { DocumentsComponentMode } from './documents-component-mode.enum';
import { UsersDocuments } from 'src/app/shared/types/dto/users-documents-dto';
import { PermissionsEnum } from 'src/app/shared/types/enums/permissions.enum';

@Component({
    selector: '<app-main-page-documents>',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class MainPageDocumentsComponent implements OnInit {
    public documents: UsersDocuments[];
    public selected: UsersDocuments = null;
    public permissions: PermissionsEnum[];

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

            if (this.userId && this.userId !== DEFAULT_USER_ID) {
                this.setUserDataId(this.userId);
                this.setPermissions(this.userId);
            }
        });
    }

    public documentSelected(document: UsersDocuments): void {
        this.selected = document;
    }

    private setUserDataId(userId: string): void {
        this.dataSourceService.getUserById(userId).subscribe(user => {
            this.userDataId = user.userDataId.toString();

            if (this.userDataId) {
                this.setUsersDocuments();
            }
        });
    }

    private setPermissions(userId: string): void {
        this.dataSourceService
            .getPermissions(userId)
            .subscribe(permissions => {
                this.permissions = permissions;
        });
    }

    private setUsersDocuments(): void {
        this.getUsersDocmentsObservable().subscribe(documents => {
            this.documents = documents;
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
