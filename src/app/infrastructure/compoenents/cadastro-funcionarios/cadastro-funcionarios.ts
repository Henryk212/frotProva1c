import { Component, computed, effect, inject } from '@angular/core';
import { Buscar } from '../../service/buscar';
import e from 'express';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Salvar } from '../../service/salvar';
import { Excluir } from '../../service/excluir';
import { Editar } from '../../service/editar';

@Component({
  selector: 'app-cadastro-funcionarios',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-funcionarios.html',
  styleUrl: './cadastro-funcionarios.scss'
})
export class CadastroFuncionarios {

  readonly buscarService = inject(Buscar);
  readonly salvarService = inject(Salvar);
  readonly excluirService = inject(Excluir);
  readonly editarService = inject(Editar)
  readonly formBuilder = inject(FormBuilder);

  funcionarioForm!: FormGroup;

  funcionarioComID = {}

  isEdicao: boolean = false;

  cargos = computed(() => this.buscarService.cargosList());
  setores = computed(() => this.buscarService.setorList());
  pessoas = computed(() => this.buscarService.pessoaList());
  dadosBancarios = computed(() => this.buscarService.dadosBancariosList());
  funcionarios = computed(() => this.buscarService.funcionarioList());

  paginaAtual: number = 1;
  itensPorPagina: number = 10;
  get totalPaginas(): number {
    return Math.ceil(this.funcionarios().length / this.itensPorPagina);
  }
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  constructor(){
    effect(() => {
      console.log('Cargos:', this.cargos());
      console.log('Setores:', this.setores());
      console.log('Pessoas:', this.pessoas());
      console.log('Dados Bancários:', this.dadosBancarios());
      console.log('Funcionários:', this.funcionarios());
    });
  }

  ngOnInit(){
    this.buscarDados();
    this.initFormFuncionario();
    this.buscarService.buscarFuncionarios();
  }

  buscarDados() {
    this.buscarService.buscarCargos();
    this.buscarService.buscarSetor();
    this.buscarService.buscarPessoa();
    this.buscarService.buscarDadosBancarios();
  }

  initFormFuncionario() {
    this.funcionarioForm = this.formBuilder.group({
      pessoaId: [null, Validators.required],
      cargoId: [null, Validators.required],
      setorId: [null, Validators.required],
      dadosBancariosId: [null, Validators.required],
      enderecoID: [null],
      salario: [null, Validators.required]
    });
  }

  salvarFuncionario(){
    const funcionario = this.funcionarioForm.value;
    const pessoaSelecionada = this.pessoas().find(p => p.id == funcionario.pessoaId);
      if (pessoaSelecionada?.endereco?.id) {
      funcionario.enderecoID = pessoaSelecionada.endereco.id;
      } else {
        console.warn('Pessoa selecionada não possui endereço. ID do endereço será enviado como null.');
        funcionario.enderecoID = null;
      }
    if (this.funcionarioForm.valid) {
      if(!this.isEdicao){
        this.salvarService.salvarFuncionario(funcionario).then(() => {
          this.limparCampos();
          this.buscarDados();
        }).catch(error => {
          console.error('Erro ao salvar Funcionário:', error);
        });
      }else if(this.isEdicao){
        this.funcionarioComID = {...this.funcionarioComID,
            pessoaId: funcionario.pessoaId,
            cargoId: funcionario.cargoId,
            setorId: funcionario.setorId,
            dadosBancariosId: funcionario.dadosBancariosId,
            enderecoID: funcionario.enderecoID,
            salario: funcionario.salario,
        }

         this.editarService.editarFuncionario( this.funcionarioComID).then(() => {
          this.limparCampos();
          this.buscarDados();
          this.isEdicao = false
        }).catch(error => {
          console.error('Erro ao salvar Funcionário:', error);
        });
      }

    }
  }

   editarFuncionario(funcionario: any) {
    this.isEdicao = true
    this.funcionarioForm.patchValue({
      pessoaId: funcionario.pessoaId,
      cargoId: funcionario.cargoId,
      setorId: funcionario.setorId,
      dadosBancariosId: funcionario.dadosBancariosId,
      enderecoID: funcionario.enderecoID,
      salario: funcionario.salario,
    })
    this.funcionarioComID = {id:funcionario.id}
  }

  excluirFuncionario(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.excluirService.excluirFuncionario(id).then(() => {
        alert('Funcionário excluído com sucesso!');
        this.buscarDados();
      }).catch(error => {
        console.error('Erro ao excluir funcionário:', error);
      });
    }
  }

  calcularProporcionalDeFerias(salario: any ){
    let proporcionalSalario = salario /12;
    let proporcionalFerias = salario / 3;
    let calculo =  proporcionalSalario + proporcionalFerias
    return calculo
  }
  calcularTotalProporcionalDeFerias(){
    let contar = 0;
    let proporcionalSalario = 0;
    let proporcionalFerias = 0;

    for(let funcionario of this.funcionarios()){
      proporcionalSalario += funcionario.salario /12;
      proporcionalFerias += funcionario.salario /3
      contar += proporcionalSalario + proporcionalFerias;
    }
    return contar
  }

  calcularTotalSalario(){
    let contar = 0;
    for(let funcionario of this.funcionarios()){
      contar += funcionario.salario
  }
    return contar
  }
  calcularTotalFGTS(){
    let contar = 0;
    for(let funcionario of this.funcionarios()){
      contar += funcionario.salario*0.08
  }
    return contar
  }

  calcularTotalDecimo(){
    let contar = 0;
    for(let funcionario of this.funcionarios()){
      contar += funcionario.salario/12;
      console.log("contar decimo terceiro",contar);
  }
  return contar
}



  limparCampos(){
    this.funcionarioForm.reset();
  }

}
