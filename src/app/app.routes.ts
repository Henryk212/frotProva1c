import { Routes } from '@angular/router';
import { CadastroCargos } from './infrastructure/compoenents/cadastro-cargos/cadastro-cargos';
import { CadastroSetor } from './infrastructure/compoenents/cadastro-setor/cadastro-setor';
import { CadastroPessoa } from './infrastructure/compoenents/cadastro-pessoa/cadastro-pessoa';

export const routes: Routes = [
// { path: 'funcionario', component: FuncionarioComponent },
  { path: 'cargo', component: CadastroCargos },
  {path: 'setor', component: CadastroSetor},
  {path: 'pessoa', component: CadastroPessoa},
  { path: '', redirectTo: 'pessoa', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'pessoa' } 
];
