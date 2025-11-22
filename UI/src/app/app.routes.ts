import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.DashboardComponent),
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
    path: 'veiculos/editar/:id', // edição
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
    path: 'motoristas/cadastro', // cadastro
    loadComponent: () =>
      import('./features/motorista/pages/motorista-form/motorista-form').then(
        (c) => c.CadastroMotoristaComponent
      ),
  },
  {
    path: 'motoristas/editar/:id', // edição
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
    path: 'manutencao/cadastro', // cadastro
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-form/manutencao-form').then(
        (c) => c.ManutencaoFormComponent
      ),
  },
  {
    path: 'manutencao/editar/:id', // edição
    loadComponent: () =>
      import('./features/manutencao/pages/manutencao-form/manutencao-form').then(
        (c) => c.ManutencaoFormComponent
      ),
  },

  {
    path: 'distribuicao',
    loadComponent: () =>
      import(
        './features/distribuicao-da-frota/pages/distribuicao-da-frota-list/distribuicao-da-frota-list'
      ).then((m) => m.DistribuicaoDaFrotaListComponent),
  },
  {
    path: 'distribuicao-da-frota-form',
    loadComponent: () =>
      import(
        './features/distribuicao-da-frota/pages/distribuicao-da-frota-form/distribuicao-da-frota-form'
      ).then((m) => m.DistribuicaoDaFrotaFormComponent),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
