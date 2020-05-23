import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/operator/toPromise';

import * as moment from 'moment';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) { 
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response.json());
  }

  lancamentosPorDia() : Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`).
      toPromise().then(response => {
        const dados = response.json();
        this.convertStringToDate(dados);
        return dados;
      });
  }

  private convertStringToDate(dates: Array<any>) {
    for (const date of dates) {
      date.dia = moment(date.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
