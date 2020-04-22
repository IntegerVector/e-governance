import { UserPageBaseStrategy } from './user-page-base-strategy.interface';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { DataSaverService } from 'src/app/shared/services/data-saver/data-saver.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/types/dto/user-dto';
import { UserData } from 'src/app/shared/types/dto/user-data-dto';

export class UserPageViewAndUpdateStrategy implements UserPageBaseStrategy {
    constructor(
        private dataSourceService: DataSourceService,
        private dataSaverService: DataSaverService
    ) {}

    public getUser(userId: string): Observable<User> {
        return this.dataSourceService.getUserById(userId);
    }

    public getUserData(userId: string): Observable<UserData> {
        return this.dataSourceService.getUserDataByUserId(userId);
    }

    public submit(user: User & UserData): Observable<User> {
        return this.dataSourceService.updateUser(user);
    }
}
