import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Enviroments } from '../configuracoes/enviroments';

@Injectable({
  providedIn: 'root'
})
export class Buscar {

  private readonly apiUrl: string = Enviroments.API_URL_CARGO;
  private readonly http = inject(HttpClient);

  private readonly cargosListSignal = signal<any[]>([]);
  readonly cargosList: Signal<any[]> = this.cargosListSignal.asReadonly()

  buscarCargos() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrl)).then(response => {
      this.updateCargosList(response);
      return response;
    });
  }

  private updateCargosList(cargos: any[]) {
    this.cargosListSignal.set(cargos);
  }
}
