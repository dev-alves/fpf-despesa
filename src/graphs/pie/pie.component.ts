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
  public graphBar: [];
  public graphPie: [];

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.despesaService.listarDespesas().subscribe(
      response => {
        this.depesas = response;
        this.iniciarGraph();
    });
  }

  iniciarGraph() {
    const ctxBr = document.getElementById('bar');
    const ctxPie = document.getElementById('pie');
    const graph = this.group(this.depesas);
    const graphLabels = Object.keys(graph);
    const graphData = Object.values(graph);

    this.graphPie = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: graphLabels.map( (e) => e),
        datasets: [
          { 
            data: graphData,
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Gráfico de despesas'
        },
        legend: {
          display: false
        },
      }
    });

    this.graphBar = new Chart(ctxBr, {
      type: 'bar',
      data: {
        labels: graphLabels.map( (e) => e),
        datasets: [
          { 
            data: graphData,
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Gráfico de despesas'
        },
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
              max: 800,
              min: 0,
              stepSize: 100
            }
          }],
        }
      }
    });
  }

  // [1, 10, 7, 2, 1, 29, 10, 10, 3, 3]
  group(despesas: Despesa[]): {} {
    const grupo = despesas.reduce((acc, item) => {
      if(String(item.tipoDespesa) in acc) {
        acc[String(item.tipoDespesa.nome)] = parseFloat(acc[item.valorDespesa.toString()]) + parseFloat(item.valorDespesa.toString());
      } else {
        acc[String(item.tipoDespesa.nome)] = [item.valorDespesa];
      }
      return acc;
    }, {});

    return grupo;
  }
}