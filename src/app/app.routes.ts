import { Routes } from '@angular/router';
import { CadastroCargos } from './infrastructure/compoenents/cadastro-cargos/cadastro-cargos';

export const routes: Routes = [
// { path: 'funcionario', component: FuncionarioComponent },
  { path: 'cargo', component: CadastroCargos },
  { path: '', redirectTo: 'cargo', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'cargo' } 
];
