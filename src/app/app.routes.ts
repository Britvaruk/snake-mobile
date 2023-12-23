import { Routes } from '@angular/router';
import { canActivateAuth } from './core/guards/guards-fn.const';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [canActivateAuth],
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'records',
        loadComponent: () =>
          import('./pages/records/records.page').then((m) => m.RecordsPage),
      },
      {
        path: 'game',
        loadComponent: () =>
          import('./pages/game/game.page').then((m) => m.GamePage),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: '',
        redirectTo: '/tabs/records',
        pathMatch: 'full',
      },
    ],
  },
];
