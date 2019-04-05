import { Component, OnInit } from '@angular/core';
import { DespesaService } from 'src/app/service/despesa.service';
import { Chart } from 'chart.js';
import { Despesa } from 'src/app/model/despesa';
import * as moment from 'moment';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  public depesas: Despesa[];
  public charInfo: [];

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.despesaService.listarDespesas().subscribe(
      response => {
        this.depesas = response;
        this.iniciarGraph();
    });
  }

  iniciarGraph() {
    const ctx = document.getElementById('canvas');
    moment.locale('pt-BR');
    const graph = this.group(this.depesas);
    const graphLabels = Object.keys(graph);
    const graphData = Object.values(graph);

    this.charInfo = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: graphLabels.map( (e) => moment(e).format('L')),
        datasets: [
          { 
            data: graphData,
            borderColor: "#3cba9f",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true,
            ticks: {
              max: 50000,
              min: 0,
              stepSize: 5000
            }
          }],
        }
      }
    });
  }

  // [1, 10, 7, 2, 1, 29, 10, 10, 3, 3]
  group(despesas: Despesa[]): {} {
    const grupo = despesas.reduce((acc, item) => {
      if(String(item.dataDespesa) in acc) {
        acc[String(item.dataDespesa)] = parseFloat(acc[String(item.dataDespesa)]) + parseFloat(item.valorDespesa.toString());
        acc[String(item.dataDespesa)] = acc[String(item.dataDespesa)].toFixed(2);
      } else {
        acc[String(item.dataDespesa)] = [item.valorDespesa];
      }
      return acc;
    }, {});

    return grupo;
  }
}