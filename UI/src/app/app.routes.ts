// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/frota', pathMatch: 'full' },
  {
    path: 'frota',
    loadComponent: () =>
      import('./modules/gestao-frota/components/lista-veiculos/lista-veiculos.component').then(
        (c) => c.ListaVeiculosComponent
      ),
  },
  {
    path: 'cadastro-veiculo',
    loadComponent: () =>
      import('./modules/gestao-frota/components/cadastro-veiculo/veiculo-form.component').then(
        (c) => c.VeiculoFormComponent
      ),
  },
  {
    path: 'cadastro-motorista',
    loadComponent: () =>
      import('./modules/gestao-frota/components/cadastro-motorista/cadastro-motorista').then(
        (c) => c.CadastroMotoristaComponent
      ),
  },
  { path: '**', redirectTo: '/frota' },
];
