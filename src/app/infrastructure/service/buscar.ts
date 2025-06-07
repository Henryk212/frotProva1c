import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Enviroments } from '../configuracoes/enviroments';

@Injectable({
  providedIn: 'root'
})
export class Buscar {

  private readonly apiUrlCargo: string = Enviroments.API_URL_CARGO;
  private readonly apiUrlSetor: string = Enviroments.API_URL_SETOR;
  private readonly apiUrlPessoa: string = Enviroments.API_URL_PESSOA;
  private readonly apiUrlFuncionario: string = Enviroments.API_URL_FUNCIONARIO;
  private readonly apiUrlDadosBancarios: string = Enviroments.API_URL_DADOS_BANCARIOS;
  
  private readonly http = inject(HttpClient);

  private readonly cargosListSignal = signal<any[]>([]);
  readonly cargosList: Signal<any[]> = this.cargosListSignal.asReadonly()

  private readonly setorListSignal = signal<any[]>([]);
  readonly setorList: Signal<any[]> = this.setorListSignal.asReadonly()

  private readonly pessoaListSignal = signal<any[]>([]);
  readonly pessoaList: Signal<any[]> = this.pessoaListSignal.asReadonly()

  private readonly pessoaEditarSignal = signal<any>({});
  readonly pessoaEditar: Signal<any> = this.pessoaEditarSignal.asReadonly()

  private readonly funcionarioListSignal = signal<any[]>([]);
  readonly funcionarioList: Signal<any[]> = this.funcionarioListSignal.asReadonly()

  private readonly dadosBancariosListSignal = signal<any[]>([]);
  readonly dadosBancariosList: Signal<any[]> = this.dadosBancariosListSignal.asReadonly()



  buscarCargos() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrlCargo)).then(response => {
      this.updateCargosList(response);
      return response;
    });
  }

  buscarSetor() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrlSetor)).then(response => {
      this.updateSetorList(response);
      return response;
    });
  }

  buscarCep(cep: string){
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }

  buscarPessoa() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrlPessoa)).then(response => {
      this.updatePessoaList(response);
      return response;
    });
  }

  buscarPessoaPorId(id: number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrlPessoa}/${id}`)).then(response => {
      this.updatePessoaEditar(response);
      return response;
    });
  }

  buscarFuncionarios() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrlFuncionario)).then(response => {
      this.updateFuncionarioList(response);
      return response;
    });
  }

  buscarDadosBancarios() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrlDadosBancarios)).then(response => {
      this.updateDadosBancariosList(response);
      return response;
    });
  }

  private updateSetorList(setores: any[]) {
    this.setorListSignal.set(setores);
  }

  private updateCargosList(cargos: any[]) {
    this.cargosListSignal.set(cargos);
  }

  private updatePessoaList(pessoas: any[]) {
    this.pessoaListSignal.set(pessoas);
  }

  private updatePessoaEditar(pessoa: any) {
    this.pessoaEditarSignal.set(pessoa);
  }

  private updateFuncionarioList(funcionarios: any[]) {
    this.funcionarioListSignal.set(funcionarios);
  }

  private updateDadosBancariosList(dadosBancarios: any[]) {
    this.dadosBancariosListSignal.set(dadosBancarios);
  }


}
