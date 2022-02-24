import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-cantidad-casos',
  templateUrl: './reporte-cantidad-casos.component.html',
  styleUrls: ['./reporte-cantidad-casos.component.css']
})
export class ReporteCantidadCasosComponent implements OnInit, OnDestroy {

  private meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  config = {};

  @Input() update: Subject<number>;
  @Input() currentYear: number;

  private subscriber: Subscription[] = [];

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const subUpdate = this.update.subscribe(year => {
      const subReporte = this._reportesService.getCasosPorMes(year)
        .subscribe(resp => {
          this.processResp(resp);
        });
      this.subscriber.push(subReporte);
    });
    this.subscriber.push(subUpdate);
  }

  ngOnDestroy(): void {
    this.subscriber.forEach(s => s.unsubscribe());
  }

  private processResp(resp) {
    const labels = [];
    const data = [];

    resp.forEach(item => {
      labels.push(this.meses[+item.label]);
      data.push(item.total);
    });
    this.initConfig(labels, data);
  }

  private initConfig(labels, dataUsers) {
    const colors = '#bbdefb';
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Usuarios',
          data: dataUsers,
          borderColor: colors,
          backgroundColor: colors,
          order: 1
        },
      ]
    };

    this.config = Object.assign({}, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            color: '#3080d0',
            align: 'center',
            anchor: 'center'
          },
          legend: {
            position: 'top',
            display: false
          },
          title: {
            display: true,
            text: 'Numero de usuarios mes a mes'
          }
        }
      },
    });
  }

}
