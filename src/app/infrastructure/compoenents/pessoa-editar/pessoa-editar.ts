import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject } from '@angular/core';
import { Buscar } from '../../service/buscar';
import { Salvar } from '../../service/salvar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Editar } from '../../service/editar';

@Component({
  selector: 'app-pessoa-editar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pessoa-editar.html',
  styleUrl: './pessoa-editar.scss'
})
export class PessoaEditar {
  readonly buscarService = inject(Buscar);
  readonly salvarService = inject(Salvar);
  readonly editarService = inject(Editar);
  readonly route = inject(ActivatedRoute);
  readonly formBuilder = inject(FormBuilder);
  readonly cdr = inject(ChangeDetectorRef);
  readonly router = inject(Router);

  pessoaEditarForm!: FormGroup;
  enderecoEditarForm!: FormGroup;
  pessoaEditar = computed(() => this.buscarService.pessoaEditar());

  constructor() {
    effect(() => {
      console.log('Pessoa Editar:', this.pessoaEditar());
      
      this.updateForm();
    });
  }

  ngOnInit() {
    this.initForm(); 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.buscarService.buscarPessoaPorId(id).then(() => {
        this.updateForm();
      });
    }
  }

  private formatarData(data: string): string {
  const date = new Date(data);
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

  initForm() {
    this.pessoaEditarForm = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      dataNascimento: [''],
      telefone: [''],
      email: [''],
      sexo: [''],
      id:[''],
      enderecoID: [''],
      endereco:[''],

    });

    this.enderecoEditarForm = this.formBuilder.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      id: [''],
      tipoLogradouro: [''],
    });
  }

updateForm() {
  const pessoa = this.pessoaEditar();
  if (pessoa) {
    this.pessoaEditarForm.patchValue({
      nome: pessoa.nome || '',
      cpf: pessoa.cpf || '',
      dataNascimento: pessoa.dataNascimento ? this.formatarData(pessoa.dataNascimento) : '',
      telefone: pessoa.telefone || '',
      email: pessoa.email || '',
      sexo: pessoa.sexo || '',
      id: pessoa.id || '',
      enderecoID: pessoa.enderecoID || null
    });

    if (pessoa.endereco) {
      this.enderecoEditarForm.patchValue({
        cep: pessoa.endereco.cep || '',
        logradouro: pessoa.endereco.logradouro || '',
        numero: pessoa.endereco.numero || '',
        complemento: pessoa.endereco.complemento || '',
        bairro: pessoa.endereco.bairro || '',
        cidade: pessoa.endereco.cidade || '',
        estado: pessoa.endereco.estado || '',
        id: pessoa.endereco.id || '',
        tipoLogradouro: pessoa.endereco.tipoLogradouro || ''
      });
    } else {
      console.warn('Endereço não encontrado para a pessoa.');
    }

    this.cdr.detectChanges();
  } else {
    console.warn('Pessoa não encontrada.');
  }
}

  salvarPessoa() {
    if (this.pessoaEditarForm.valid && this.enderecoEditarForm.valid) {
      const pessoa = {...this.pessoaEditarForm.value,
                         endereco: this.enderecoEditarForm.value
        }
      this.editarService.editarPesaoa(pessoa).then(() => {
        this.limparCampos();
        this.buscarService.buscarPessoa();
      }).catch(error => {
        console.error('Erro ao salvar Pessoa:', error);
      });
    } else {
      Object.keys(this.pessoaEditarForm.controls).forEach(field => {
        const control = this.pessoaEditarForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  limparCampos() {
    this.pessoaEditarForm.reset();
    this.enderecoEditarForm.reset();
    this.router.navigate(['/pessoa-listar']); 

  }
}