import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Buscar } from '../../service/buscar';
import { Salvar } from '../../service/salvar';

@Component({
  selector: 'app-cadastro-pessoa',
  imports: [FormsModule, 
            ReactiveFormsModule, 
            CommonModule,],
  templateUrl: './cadastro-pessoa.html',
  styleUrl: './cadastro-pessoa.scss'
})
export class CadastroPessoa {

  readonly formBuilder = inject(FormBuilder);
  readonly buscar = inject(Buscar); 
  readonly salvar = inject(Salvar);

  pessoaForm!: FormGroup;
  enderecoForm!: FormGroup;
  dadosBancariosForm!: FormGroup;

  constructor() {
 
  }

  ngOnInit() {
    this.initFormPessoa();
    this.initFormEndereco();
    this.initFormDadosBancarios();
  }

  initFormPessoa(){
    this.pessoaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  initFormEndereco(){
    this.enderecoForm = this.formBuilder.group({
      logradouro: ['', Validators.required],
      numero: ['',],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      complemento: ['']
    });
  }

  initFormDadosBancarios(){
    this.dadosBancariosForm = this.formBuilder.group({
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      tipoConta: ['', Validators.required],
      cpfTitular: ['', Validators.required],
      nomeTitular: ['', Validators.required],
      telefoneTitular: ['', Validators.required],
      emailTitular: ['', Validators.required]
    });
  }

  salvarPessoa() {
    if (this.pessoaForm.valid && this.enderecoForm.valid && this.dadosBancariosForm.valid) {
      const dados = {
        pessoa: this.pessoaForm.value,
        endereco: this.enderecoForm.value,
      };
      dados.endereco.tipoLogradouro = dados.endereco.logradouro.includes('Rua') ? 'Rua' : 'Avenida';
      this.salvar.salvarPessoa(dados).then(() => {
      }).catch(error => {
        console.error('Erro ao salvar pessoa:', error);
      });
      this.salvar.salvarDadosBancarios(this.dadosBancariosForm.value).then(() => {
      }).catch(error => {
        console.error('Erro ao salvar dados bancários:', error);
      });
      this.limparCampos();
    } else {
      console.error('Formulário inválido');
    }
  }

  limparCampos() {
    this.pessoaForm.reset();
    this.enderecoForm.reset();
    this.dadosBancariosForm.reset();
  }

  buscarCep() {
    const cep = this.enderecoForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.buscar.buscarCep(cep).subscribe((endereco: any) => {
        if (endereco) {
          this.enderecoForm.patchValue({
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf,
            cep: endereco.cep
          });
        } else {
          console.error('CEP não encontrado');
        }
      }, error => {
        console.error('Erro ao buscar CEP:', error);
      });
    } else {
      console.error('CEP inválido');
    }
  }


}
