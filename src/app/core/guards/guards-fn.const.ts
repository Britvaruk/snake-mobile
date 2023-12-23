import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const canActivateAuth: CanActivateFn = () =>
  inject(AuthGuard).canActivate();
