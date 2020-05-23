import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;

  lineChartData = {
    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Receitas',
        data: [4, 10, 18, 5, 1, 20, 3],
        borderColor: '#3366CC'
      }, {
        label: 'Despesas',
        data: [10, 15, 8, 5, 1, 7, 9],
        borderColor: '#D62B00'
      }
    ]
  };

  constructor(private dashboardService: DashboardService) { 

  }

  ngOnInit() {
    this.configPieChart();
  }

  DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
                    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
                    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
                    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

  configPieChart() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: this.configureColorsToChart(dados)
            }
          ]
        };
      });
  }

  private configureColorsToChart(data: Array<any>) {
    let colors = [];

    if (data.length) {
      colors = data.map((element, index) => {
          return this.DEFAULT_COLORS[index % this.DEFAULT_COLORS.length];
        }
      )}
     return colors;
  }

}
