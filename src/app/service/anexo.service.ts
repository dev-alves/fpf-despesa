import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Anexo } from '../model/anexo';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  private url = environment.host + 'anexos';

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<Anexo> {
    return this.http.post<Anexo>(this.url, formData)
    .pipe(
      catchError( e => of (e) )
    );
  }
  
}
