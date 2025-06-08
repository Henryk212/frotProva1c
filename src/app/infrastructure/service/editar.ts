import { Enviroments } from './../configuracoes/enviroments';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Editar {

    private readonly http = inject(HttpClient);
    private readonly apiUrlFuncionario: string = Enviroments.API_URL_FUNCIONARIO;
    private readonly apiUrlPessoa: string = Enviroments.API_URL_PESSOA;
    private readonly apiUrlDadosBancarios: string = Enviroments.API_URL_DADOS_BANCARIOS;
    private readonly apiUrlSetor: string = Enviroments.API_URL_SETOR;
    private readonly apiUrlCargo: string = Enviroments.API_URL_CARGO;

    editarFuncionario(funcionario:any){
        return firstValueFrom(this.http.put<any>(`${this.apiUrlFuncionario}/${funcionario?.id}`, funcionario)).then(response => {
            return response;
        }).catch(error => {
            console.error('Erro ao Editar Funcionario:', error);
            throw error;
        })
    }

    editarSetor(setor:any){
        return firstValueFrom(this.http.put<any>(`${this.apiUrlSetor}/${setor?.id}`, setor)).then(response => {
            return response;
        }).catch(error => {
            console.error('Erro ao Editar Setor:', error);
            throw error;
        })
    }

    editarCargo(cargo:any){
        return firstValueFrom(this.http.put<any>(`${this.apiUrlCargo}/${cargo?.id}`, cargo)).then(response => {
            return response;
        }).catch(error => {
            console.error('Erro ao Editar Cargo:', error);
            throw error;
        })
    }

    editarPesaoa(pessoa:any){
        return firstValueFrom(this.http.put<any>(`${this.apiUrlPessoa}/${pessoa?.id}`, pessoa)).then(response => {
            return response;
        }).catch(error => {
            console.error('Erro ao Editar Pessoa:', error);
            throw error;
        })
    }

}