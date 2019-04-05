import { Component, OnInit } from '@angular/core';
import { Despesa } from '../model/despesa';
import { DespesaService } from '../service/despesa.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  public despesas: Despesa[];

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.despesaService.listarDespesas().subscribe(
      response => {
        this.despesas = response;
      }
    )
  }

  remover(despesa: Despesa) {
    this.despesaService.deletarDespesa(despesa);
  }

}
