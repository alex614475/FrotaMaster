import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-list/lista-veiculos').then(
        (c) => c.ListaVeiculosComponent
      ),
  },
  {
    path: 'motoristas',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-list/lista-motoristas').then(
        (c) => c.ListaMotoristasComponent
      ),
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
