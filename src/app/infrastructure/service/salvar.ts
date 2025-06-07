import { inject, Injectable, Signal, signal } from '@angular/core';
import { Enviroments } from '../configuracoes/enviroments';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Salvar {

  private readonly apiUrl: string = Enviroments.API_URL_CARGO;
  private readonly http = inject(HttpClient);

  salvarCargo(cargo: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(this.apiUrl, cargo)).then(response => {
      return response;
    }).catch(error => {
      console.error('Erro ao salvar cargo:', error);
      throw error;
    });
  }

  salvarSetor(setor: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(Enviroments.API_URL_SETOR, setor)).then(response => {
      return response;
    }).catch(error => {
      console.error('Erro ao salvar setor:', error);
      throw error;
    });
  }

  salvarDadosBancarios(dadosBancarios: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(Enviroments.API_URL_DADOS_BANCARIOS, dadosBancarios)).then(response => {
      return response;
    }).catch(error => {
      console.error('Erro ao salvar dados bancários:', error);
      throw error;
    });
  }

  salvarPessoa(pessoa: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(Enviroments.API_URL_PESSOA, pessoa)).then(response => {
      return response;
    }).catch(error => {
      console.error('Erro ao salvar pessoa:', error);
      throw error;
    });
  }

  salvarFuncionario(funcionario: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(Enviroments.API_URL_FUNCIONARIO, funcionario)).then(response => {
      return response;
    }).catch(error => {
      console.error('Erro ao salvar funcionário:', error);
      throw error;
    });
  }

  



}
