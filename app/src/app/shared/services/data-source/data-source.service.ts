import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PanelOptionsDTO, PanelOptions } from '../../types/dto/panel-options-dto';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  private userId: string = null;
  private userTocken: string = null;

  // To delete:
  private panelOptionsMock: PanelOptions = {
    left: [
      {
        title: 'Test',
        url: 'test'
      }
    ],
    center: {
      iconUrl: 'icon-url',
      label: 'Main Page',
      url: '/'
    },
    right: {
      buttons: [
        {
          title: 'Just Mock button',
          url: 'fuck'
        }
      ],
      user: {
        avatarUrl: 'user-avatar',
        mainLabel: 'Fuck, You',
        subLabel: 'some sub data'
      }
    }
  };

  constructor(private http: HttpClient) { }

  public isUserIdValid(userId: string): boolean {
    if (!this.userId) {
      return false;
    }

    return userId === this.userId ? true : false;
  }

  public getTokenById(userId: string): string {
    return userId === this.userId ? this.userTocken : null;
  }

  public getPanelOptions(): Observable<any> {
    return of(this.panelOptionsMock);
  }
}
