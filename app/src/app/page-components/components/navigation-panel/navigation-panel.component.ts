import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DEFAULT_USER_ID } from 'src/app/shared/constants/shared.constants';
import { User } from 'src/app/shared/types/dto/user-dto';
import { UserData } from 'src/app/shared/types/dto/user-data-dto';
import { PermissionsEnum } from 'src/app/shared/types/enums/permissions.enum';
import { UserTypeEnum } from 'src/app/shared/types/enums/user-type.enum';
import { UserType } from 'src/app/shared/types/dto/user-type-dto';

@Component({
    selector: 'app-navigation-panel',
    templateUrl: './navigation-panel.component.html',
    styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnChanges {
    @Input() userId: string;

    public user: User;
    public userData: UserData;
    public permissions = {
        isUserViewPermitted: false,
        isUserRegisterPermitted: false,
        isSignedIn: false
    };
    public userTypes: UserType[];

    constructor(private dataSourceService: DataSourceService) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.userId.currentValue) {
            this.updateUser(this.userId);
            this.updateUserData(this.userId);
            this.updatePermissions(this.userId);

            this.dataSourceService.getUsersTypes().subscribe(types => {
                this.userTypes = types;
            });
        }
    }

    public getUserTypeText(userTypeId: number): string {
        return this.userTypes.find(type => type.userTypeId === userTypeId).type;
    }

    private updateUser(userId: string): void {
        if (userId && userId !== DEFAULT_USER_ID) {
            this.dataSourceService.getUserById(userId).subscribe(user => {
                this.user = user;
            });
        }
    }

    private updateUserData(userId: string): void {
        if (userId && userId !== DEFAULT_USER_ID) {
            this.dataSourceService.getUserDataByUserId(userId).subscribe(userData => {
                this.userData = userData;
            });
        }
    }

    private updatePermissions(userId: string): void {
        if (userId && userId !== DEFAULT_USER_ID) {
            this.dataSourceService.getPermissions(userId).subscribe(permissions => {
                this.permissions.isUserViewPermitted = !!permissions.find(permission => {
                    return permission === PermissionsEnum.ReadUsers;
                });

                this.permissions.isUserRegisterPermitted = !!permissions.find(permission => {
                    return permission === PermissionsEnum.AddUser;
                });

                this.permissions.isSignedIn = true;
            });
        } else {
            this.permissions.isSignedIn = false;
            this.permissions.isUserRegisterPermitted = false;
            this.permissions.isUserViewPermitted = false;
        }
    }
}
