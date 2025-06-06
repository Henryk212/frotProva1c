import { inject, Injectable } from "@angular/core";
import { Enviroments } from "../configuracoes/enviroments";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Excluir {

    private readonly apiUrl: string = Enviroments.API_URL_CARGO;
    private readonly http = inject(HttpClient);

    excluirCargo(id: number): Promise<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).toPromise()
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Erro ao excluir cargo:', error);
            throw error;
        });
    }

    excluirSetor(id: number): Promise<any> {
        return this.http.delete<any>(`${Enviroments.API_URL_SETOR}/${id}`).toPromise()
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Erro ao excluir setor:', error);
            throw error;
        });
    }


}