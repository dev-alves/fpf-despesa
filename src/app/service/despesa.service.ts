import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Despesa } from '../model/despesa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private url: string = environment.host + 'despesas';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http: HttpClient) { }  

  salvar(despesa: Despesa): Observable<any> {
    return this.http.post(this.url, despesa, this.httpOptions)
      .pipe(
        catchError( e => of ( e ) )
      );
  }

  listarDespesas(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(this.url);
  }

  deletarDespesa(despesa: Despesa): Observable<{}> {
    return this.http.delete(`${this.url}/${despesa.id}`);
  }

}
