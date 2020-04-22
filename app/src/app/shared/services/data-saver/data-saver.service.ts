import { Injectable } from '@angular/core';

import { UserDataInterface } from './types/user-data.interface';
import { DEFAULT_USER_ID, DEFAULT_USER_TOKEN } from '../../constants/shared.constants';

@Injectable({
    providedIn: 'root'
})
export class DataSaverService {
    private localStorage: Storage;
    private itemToSave = 'userData';
    private defaultUserData: UserDataInterface = {
        userId: DEFAULT_USER_ID,
        userToken: DEFAULT_USER_TOKEN
    };

    constructor() {
        this.localStorage = window.localStorage || null;
    }

    public clearUserData(): void {
        try {
            this.localStorage.removeItem(this.itemToSave);
        } catch (e) {
            // will just ignore it
        }
    }

    public saveUserData(userData: UserDataInterface): void {
        try {
            const oldData = this.getUserData();
            const dataToSave = oldData ? { ...oldData, ...userData } : userData;
            this.localStorage.setItem(this.itemToSave, JSON.stringify(dataToSave));
        } catch (e) {
            // will just ignore it
        }
    }

    public getUserData(): UserDataInterface {
        try {
            const userData = this.localStorage.getItem(this.itemToSave);
            return JSON.parse(userData);
        } catch (e) {
            return this.defaultUserData;
        }
    }
}
