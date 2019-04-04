import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDespesa } from '../model/tipoDespesa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDespesaService {

  private url = environment.host + 'tipos-despesa';

  constructor(private http: HttpClient) { }

  listarTipos(): Observable<TipoDespesa[]> {
    return this.http.get<TipoDespesa[]>(this.url);
  }
}
