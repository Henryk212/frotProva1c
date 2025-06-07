import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Buscar } from '../../service/buscar';
import { Excluir } from '../../service/excluir';
import { Router} from '@angular/router';

@Component({
  selector: 'app-pessoa-listar',
  imports: [CommonModule],
  templateUrl: './pessoa-listar.html',
  styleUrl: './pessoa-listar.scss'
})
export class PessoaListar {

  readonly formBuilder = inject(FormBuilder)
  readonly buscarService = inject(Buscar);
  readonly excluirService = inject(Excluir);
  readonly router = inject(Router);

  listaDePessoas = computed(() => this.buscarService.pessoaList());
  
  paginaAtual: number = 1;
  itensPorPagina: number = 10;
  get totalPaginas(): number {
    return Math.ceil(this.listaDePessoas().length / this.itensPorPagina);
  }
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  ngOnInit(){
    this.buscarService.buscarPessoa();
  }

  editarPessoa(id: number){
    this.router.navigate(['/pessoa-editar', id]); 
  }

  excluirPessoa(id:number){
     if (confirm('Tem certeza que deseja excluir esta Pessoa ?')) {
      this.excluirService.excluirPessoa(id).then(() => {
        alert('Pessoa excluído com sucesso!');
        this.buscarService.buscarPessoa();
      }).catch(error => {
        console.error('Erro ao excluir Pessoa:', error);
      });
    }
  }
   
}
