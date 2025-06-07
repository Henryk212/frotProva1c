import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Buscar } from '../../service/buscar';
import { Salvar } from '../../service/salvar';
import { Excluir } from '../../service/excluir';

@Component({
  selector: 'app-cadastro-cargos',
  imports: [FormsModule, 
            ReactiveFormsModule, 
            CommonModule,
            ],
  templateUrl: './cadastro-cargos.html',
  styleUrl: './cadastro-cargos.scss'
})
export class CadastroCargos {
  readonly formBuilder = inject(FormBuilder)
  readonly buscarService = inject(Buscar);
  readonly salvarService = inject(Salvar);
  readonly excluirService = inject(Excluir);

  cargoForm!: FormGroup;
  cargoEditarForm!: FormGroup;
  listaDeCargos =  computed(() => this.buscarService.cargosList());
  paginaAtual: number = 1;
  itensPorPagina: number = 10;
  get totalPaginas(): number {
    return Math.ceil(this.listaDeCargos().length / this.itensPorPagina);
  }
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.initForm();
    this.buscarService.buscarCargos()
  }

  initForm(){
    this.cargoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    })
    this.cargoEditarForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      id: [null, Validators.required]
    });
  }

  salvarCargo() {
    if (this.cargoForm.valid) {
      const cargo = this.cargoForm.value;
      this.salvarService.salvarCargo(cargo).then(() => {
        this.limparCampos();
        this.buscarService.buscarCargos()
      }).catch(error => {
        console.error('Erro ao salvar cargo:', error);
      });
    }else {
      Object.keys(this.cargoForm.controls).forEach(field => {
        const control = this.cargoForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  limparCampos(){
    this.cargoForm.reset();
  }

  limparCamposEdicao() {
    this.cargoEditarForm.reset();
  }

  excluirCargo(cargo: any) {
     if (confirm('Tem certeza que deseja excluir este Cargo ?')) {
      this.excluirService.excluirCargo(cargo).then(() => {
        alert('Cargo excluído com sucesso!');
        this.buscarService.buscarCargos();
      }).catch(error => {
        console.error('Erro ao excluir Cargo:', error);
      });
    }
    
  }

  salvarEditarCargo(){

  }

  editarCargo(cargo: any) {
    this.cargoEditarForm.patchValue({
      nome: cargo.nome,
      descricao: cargo.descricao,
      id: cargo.id
    });
  }

}
