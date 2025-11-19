// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/components/dashboard-home/dashboard-home.component').then(
        (c) => c.DashboardHomeComponent
      ),
  },
  {
    path: 'frota',
    loadComponent: () =>
      import('./modules/gestao-frota/components/lista-veiculos/lista-veiculos.component').then(
        (c) => c.ListaVeiculosComponent
      ),
  },
  { path: '**', redirectTo: '/dashboard' },
];
