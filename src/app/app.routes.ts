import { Routes } from '@angular/router';
import { CadastroCargos } from './infrastructure/compoenents/cadastro-cargos/cadastro-cargos';
import { CadastroSetor } from './infrastructure/compoenents/cadastro-setor/cadastro-setor';
import { CadastroPessoa } from './infrastructure/compoenents/cadastro-pessoa/cadastro-pessoa';
import { PessoaListar } from './infrastructure/compoenents/pessoa-listar/pessoa-listar';
import { PessoaEditar } from './infrastructure/compoenents/pessoa-editar/pessoa-editar';
import { CadastroFuncionarios } from './infrastructure/compoenents/cadastro-funcionarios/cadastro-funcionarios';

export const routes: Routes = [
// { path: 'funcionario', component: FuncionarioComponent },
  { path: 'cargo', component: CadastroCargos },
  { path: 'setor', component: CadastroSetor},
  { path: 'pessoa-cadastro', component: CadastroPessoa},
  { path: 'cadastro-funcionario', component: CadastroFuncionarios},
  { path: 'pessoa-listar', component: PessoaListar},
  { path: 'pessoa-editar/:id', component: PessoaEditar},
  { path: '', redirectTo: 'cadastro-funcionario', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'cadastro-funcionario'} 
];
