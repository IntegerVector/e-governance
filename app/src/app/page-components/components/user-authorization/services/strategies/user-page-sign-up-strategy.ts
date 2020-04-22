import { Observable } from 'rxjs';

import { UserPageBaseStrategy } from './user-page-base-strategy.interface';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DataSaverService } from 'src/app/shared/services/data-saver/data-saver.service';
import { User } from 'src/app/shared/types/dto/user-dto';
import { UserData } from 'src/app/shared/types/dto/user-data-dto';

export class UserPageSighUpStrategy implements UserPageBaseStrategy {
    constructor(
        private dataSourceService: DataSourceService,
        private dataSaverService: DataSaverService
    ) {}

    public getUser(userId: string): Observable<User> {
        return null;
    }

    public getUserData(userId: string): Observable<UserData> {
        return null;
    }

    public submit(user: User & UserData): Observable<User> {
        return this.dataSourceService.registerNewUser(user);
    }
}
