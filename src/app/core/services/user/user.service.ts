import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserInfo } from '../../interfaces/user-info.interface';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: UserInfo | null = null;

  constructor(private userApiService: UserApiService) {}

  get staticUser(): UserInfo | null {
    return this.user;
  }

  async getUser(): Promise<UserInfo | null> {
    if (!this.user) {
      await lastValueFrom(this.userApiService.getInfo()).then((user) => {
        this.user = user;
      });
    }
    return this.user;
  }

  resetUser(): void {
    this.user = null;
  }
}
