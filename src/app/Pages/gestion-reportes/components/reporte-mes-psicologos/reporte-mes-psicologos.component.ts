import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReporteMesPsicologos } from '../../models/reporte-mes-psicologos';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-mes-psicologos',
  templateUrl: './reporte-mes-psicologos.component.html',
  styleUrls: ['./reporte-mes-psicologos.component.css']
})
export class ReporteMesPsicologosComponent implements OnInit {
  config = {};

  @Input() update: Subject<string>;
  @Input() currentYear: number;

  total = 0;

  private subscriber: Subscription[] = [];

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const subUpdate = this.update.subscribe(year => {
      const subReporte = this._reportesService.getCasosPsicologoByMes(year)
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

  private processResp(resp: ReporteMesPsicologos[]) {
    const labels = [];
    const data = [];

    this.total = 0;
    resp.forEach(item => {
      labels.push(item.nombre);
      data.push(item.total);
      this.total += item.total;
    });
    this.initConfig(labels, data);
  }

  private initConfig(labels, dataUsers) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Casos',
          data: dataUsers,
          borderColor: "#3080d0",
          backgroundColor: '#3080f0',
          order: 1
        },
      ]
    };

    this.config = Object.assign({}, {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',

        responsive: true,
        plugins: {
          datalabels: {
            color: '#3080d0',
            align: 'end',
            anchor: 'end'
          },
          legend: {
            position: 'top',
            display: false
          },
          title: {
            display: true,
            text: 'Numero de Atenciones por Psicólogo'
          },
          subtitle: {
            display: true,
            text: 'Total Atenciones ' + this.total
          }
        }
      },
    });
  }


}
