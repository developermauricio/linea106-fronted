import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-menores',
  templateUrl: './reporte-menores.component.html',
  styleUrls: ['./reporte-menores.component.css']
})
export class ReporteMenoresComponent implements OnInit {

  private meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  config = {};

  @Input() update: Subject<number>;
  @Input() currentYear: number;

  private subscriber: Subscription[] = [];

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const subUpdate = this.update.subscribe(year => {
      const subReporte = this._reportesService.getReporteMenores(year)
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
    const data = {
      labels: labels,
      datasets: [
        {
          label: '4-13 años',
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
        responsive: true,
        plugins: {
          datalabels: {
            color: '#3080d0',
            align: 'end',
            anchor: 'end'
          },
          legend: {
            position: 'top',
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
