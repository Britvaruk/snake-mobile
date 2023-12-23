import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_LOGIN, API_REGISTRATION } from 'src/environments/urls';
import { AuthBody, AuthKey } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private httpClient: HttpClient) {}

  loginPost(body: AuthBody): Observable<AuthKey> {
    return this.httpClient.post<AuthKey>(API_LOGIN, body);
  }

  registrationPost(body: AuthBody): Observable<AuthKey> {
    return this.httpClient.post<AuthKey>(API_REGISTRATION, body);
  }
}
