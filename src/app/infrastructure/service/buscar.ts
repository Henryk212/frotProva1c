import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Enviroments } from '../configuracoes/enviroments';

@Injectable({
  providedIn: 'root'
})
export class Buscar {

  private readonly apiUrlCargo: string = Enviroments.API_URL_CARGO;
  private readonly apiUrlSetor: string = Enviroments.API_URL_SETOR;
  
  private readonly http = inject(HttpClient);

  private readonly cargosListSignal = signal<any[]>([]);
  readonly cargosList: Signal<any[]> = this.cargosListSignal.asReadonly()

  private readonly setorListSignal = signal<any[]>([]);
  readonly setorList: Signal<any[]> = this.setorListSignal.asReadonly()



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

  private updateSetorList(setores: any[]) {
    this.setorListSignal.set(setores);
  }

  private updateCargosList(cargos: any[]) {
    this.cargosListSignal.set(cargos);
  }
}
