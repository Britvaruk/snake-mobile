import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_USER_INFO } from 'src/environments/urls';
import { UserInfo } from '../../interfaces/user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  getInfo(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(API_USER_INFO);
  }
}
