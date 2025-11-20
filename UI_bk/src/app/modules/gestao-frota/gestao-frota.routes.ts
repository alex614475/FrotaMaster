import { Routes } from '@angular/router';
import { ListaVeiculosComponent } from './components/lista-veiculos/lista-veiculos.component';

export const GESTAO_FROTA_ROUTES: Routes = [
  { path: '', component: ListaVeiculosComponent },
  { path: 'novo', component: ListaVeiculosComponent }, // Temporário
  { path: 'editar/:id', component: ListaVeiculosComponent }, // Temporário
];
