import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthApiService } from './auth-api.service';
import { AuthBody, AuthKey } from '../../interfaces/auth.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private userService: UserService
  ) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  login(body: AuthBody): Observable<AuthKey> {
    return this.authApiService.loginPost(body);
  }

  logout(): void {
    this.setToken(null);
    this.userService.resetUser();
    this.navigateToAuth();
  }

  private navigateToAuth(): void {
    this.router.navigate(['/login']);
  }
}
