import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Buscar } from '../../service/buscar';
import { Salvar } from '../../service/salvar';
import { Excluir } from '../../service/excluir';

@Component({
  selector: 'app-cadastro-setor',
  imports: [FormsModule, 
            ReactiveFormsModule, 
            CommonModule,],
  templateUrl: './cadastro-setor.html',
  styleUrl: './cadastro-setor.scss'
})
export class CadastroSetor {
  readonly formBuilder = inject(FormBuilder)
  readonly buscarService = inject(Buscar);
  readonly salvarService = inject(Salvar);
  readonly excluirService = inject(Excluir);

  setorForm!: FormGroup;
  setorEditarForm!: FormGroup;
  listaDeSetores =  computed(() => this.buscarService.setorList());
  paginaAtual: number = 1;
  itensPorPagina: number = 10;
  get totalPaginas(): number {
    return Math.ceil(this.listaDeSetores().length / this.itensPorPagina);
  }
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.initForm();
    this.buscarService.buscarSetor()
  }

  initForm(){
    this.setorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    })
    this.setorEditarForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      id: [null, Validators.required]
    });
  }

  salvarSetor() {
    if (this.setorForm.valid) {
      const setor = this.setorForm.value;
      this.salvarService.salvarSetor(setor).then(() => {
        this.limparCampos();
        this.buscarService.buscarSetor()
      }).catch(error => {
        console.error('Erro ao salvar Setor:', error);
      });
    }else {
      Object.keys(this.setorForm.controls).forEach(field => {
        const control = this.setorForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  limparCampos(){
    this.setorForm.reset();
  }

  limparCamposEdicao() {
    this.setorEditarForm.reset();
  }

  excluirSetor(setor: any) {
    this.excluirService.excluirSetor(setor).then(() => {
      this.buscarService.buscarSetor();
    }).catch(error => {
      console.error('Erro ao excluir cargo:', error);
    });
  }

  salvarEditarSetor(){

  }

  editarSetor(setor: any) {
    this.setorEditarForm.patchValue({
      nome: setor.nome,
      descricao: setor.descricao,
      id: setor.id
    });
  }


}
