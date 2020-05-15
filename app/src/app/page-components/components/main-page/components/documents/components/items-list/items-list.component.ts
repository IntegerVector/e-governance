import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { Documents } from 'src/app/shared/types/dto/documents-dto';
import { DocumentTypesEnum } from 'src/app/shared/types/enums/document-types.enum';
import { UsersDocuments } from 'src/app/shared/types/dto/users-documents-dto';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnChanges {
    @Input() documents: UsersDocuments[];
    @Output() selected = new EventEmitter<UsersDocuments>();

    public selectedDocument: UsersDocuments = null;
    public items: {
        document: Documents;
        type: DocumentTypesEnum;
    }[] = [];

    constructor(private dataSourceService: DataSourceService) {}

    public ngOnChanges(): void {
        _.forEach(this.documents, doc => {
            this.dataSourceService
                .getDocumentById(doc.documentId)
                .subscribe(document => {
                    this.dataSourceService
                        .getDocumentTypeById(document.documentType.toString())
                        .subscribe(type => {
                            this.items.push({
                                document,
                                type
                            });
                        });
                });
        });
    }

    public onSelected(document: UsersDocuments): void {
        this.selectedDocument = document;

        this.selected.emit(this.selectedDocument);
    }

    public isActive(itemId: number): boolean {
        if (this.selectedDocument) {
            return this.selectedDocument.documentId.toString() === itemId.toString();
        }

        return false;
    }
}
