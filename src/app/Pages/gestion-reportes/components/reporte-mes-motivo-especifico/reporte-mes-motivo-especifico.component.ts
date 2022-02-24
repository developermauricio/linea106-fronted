import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReporteBase } from '../../models/reporte-base';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-mes-motivo-especifico',
  templateUrl: './reporte-mes-motivo-especifico.component.html',
  styleUrls: ['./reporte-mes-motivo-especifico.component.css']
})
export class ReporteMesMotivoEspecificoComponent implements OnInit {

  config = {};

  @Input() update: Subject<string>;
  @Input() motivo_id: number;
  @Input() title: string;
  @Input() currentYear: number;

  total = 0;

  private subscriber: Subscription[] = [];

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const subUpdate = this.update.subscribe(year => {
      const subReporte = this._reportesService.getCasosMotivoEspecificoByMes(year, this.motivo_id)
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

  private processResp(resp: ReporteBase[]) {
    const labels = [];
    const data = [];

    this.total = 0;
    resp.forEach(item => {
      labels.push(item.name ? item.name : 'Anónimo');
      data.push(item.total);
      this.total += item.total;
    });
    this.initConfig(labels, data);
  }

  private initConfig(labels, dataUsers) {
    const colors = '#bbdefb';
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Casos',
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
        indexAxis: 'y',
        scales: {
          x: {
            type: 'logarithmic',
            display: false,
          }
        },
        responsive: true,
        plugins: {
          datalabels: {
            color: '#3080d0',
            align: 'center',
            anchor: 'center',
          },
          legend: {
            position: 'bottom',
            display: false
          },
          title: {
            display: true,
            text: this.title
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