import { Observable } from 'rxjs';

import { User } from 'src/app/shared/types/dto/user-dto';
import { DataSourceService } from 'src/app/shared/services/data-source/data-source.service';
import { UserPageBaseStrategy } from './user-page-base-strategy.interface';
import { UserData } from 'src/app/shared/types/dto/user-data-dto';
import { DataSaverService } from 'src/app/shared/services/data-saver/data-saver.service';

export class UserPageSignInStrategy implements UserPageBaseStrategy {
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
        return this.dataSourceService.signIn({
            login: user.login,
            pass: user.pass
        });
    }
}
