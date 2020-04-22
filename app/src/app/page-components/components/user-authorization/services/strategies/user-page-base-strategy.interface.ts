import { Observable } from 'rxjs';

import { User } from 'src/app/shared/types/dto/user-dto';
import { UserData } from 'src/app/shared/types/dto/user-data-dto';

export interface UserPageBaseStrategy {
    getUser(userId: string): Observable<User>;
    getUserData(userId: string): Observable<UserData>;
    submit(user: User & UserData): Observable<User>;
}
