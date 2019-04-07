import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Despesa } from '../model/despesa';
import { DespesaService } from '../service/despesa.service';

@Injectable({
    providedIn: 'root'
})
export class DespesaResolverGuard implements Resolve<Despesa> {
    
    constructor(
        private despesaService: DespesaService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Despesa> {
        if(route.params && route.params['id']) {
            return this.despesaService.buscar(route.params['id']);
        }

        return of({
            id: null,
            descricao: null,
            valorDespesa: null,
            dataDespesa: null,
            anexo: null,
            contentType: null,
            tipoDespesa: null
        });
    }


}