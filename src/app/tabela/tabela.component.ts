import { Component, OnInit } from '@angular/core';
import { Despesa } from '../model/despesa';
import { DespesaService } from '../service/despesa.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  public despesas: Despesa[];

  constructor(
    private despesaService: DespesaService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.despesaService.listarDespesas().subscribe(
      response => {
        this.despesas = response;
      }
    )
  }

  atualizarDespesa(id: number) {
    this.router.navigate(['editar', id]);
  }

  remover(despesa: Despesa) {
    this.despesaService.deletarDespesa(despesa).subscribe(
      () => {
        this.despesaService.listarDespesas().subscribe(
          desepesas => {
            this.despesas = desepesas;
          }
        )
      }
    );
  }

}
