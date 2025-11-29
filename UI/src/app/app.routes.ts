import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.DashboardComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/page/login').then((c) => c.LoginComponent),
  },
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-list/lista-veiculos').then(
        (c) => c.ListaVeiculosComponent
      ),
  },
  {
    path: 'veiculos/cadastro',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-form/veiculo-form').then(
        (c) => c.VeiculoFormComponent
      ),
  },
  {
    path: 'veiculos/editar/:id',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-form/veiculo-form').then(
        (c) => c.VeiculoFormComponent
      ),
  },
  {
    path: 'motoristas',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-list/lista-motoristas').then(
        (c) => c.ListaMotoristasComponent
      ),
  },
  {
    path: 'motoristas/cadastro',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-form/motorista-form').then(
        (c) => c.CadastroMotoristaComponent
      ),
  },
  {
    path: 'motoristas/editar/:id',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-form/motorista-form').then(
        (c) => c.CadastroMotoristaComponent
      ),
  },
  {
    path: 'manutencao',
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-list/manutencao-list').then(
        (c) => c.ManutencaoListComponent
      ),
  },
  {
    path: 'manutencao/cadastro',
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-form/manutencao-form').then(
        (c) => c.ManutencaoFormComponent
      ),
  },
  {
    path: 'manutencao/editar/:id',
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-form/manutencao-form').then(
        (c) => c.ManutencaoFormComponent
      ),
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
