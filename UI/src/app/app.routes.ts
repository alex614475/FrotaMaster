import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/page/login/login').then((c) => c.Login),
  },
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-list/lista-veiculos').then((c) => c.ListaVeiculos),
  },
  {
    path: 'veiculos/cadastro',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-form/veiculo-form').then((c) => c.VeiculoForm),
  },
  {
    path: 'veiculos/editar/:id',
    loadComponent: () =>
      import('./features/veiculos/pages/veiculos-form/veiculo-form').then((c) => c.VeiculoForm),
  },
  {
    path: 'motoristas',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-list/lista-motoristas').then(
        (c) => c.ListaMotoristas
      ),
  },
  {
    path: 'motoristas/cadastro',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-form/motorista-form').then(
        (c) => c.CadastroMotorista
      ),
  },
  {
    path: 'motoristas/editar/:id',
    loadComponent: () =>
      import('./features/motorista/pages/motorista-form/motorista-form').then(
        (c) => c.CadastroMotorista
      ),
  },
  {
    path: 'manutencao',
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-list/manutencao-list').then(
        (c) => c.ManutencaoList
      ),
  },
  {
    path: 'manutencao/cadastro',
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-form/manutencao-form').then(
        (c) => c.ManutencaoForm
      ),
  },
  {
    path: 'manutencao/editar/:id',
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-form/manutencao-form').then(
        (c) => c.ManutencaoForm
      ),
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
