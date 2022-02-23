import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReporteConductaSuicida } from '../../models/reporte-conducta-suicida';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-conducta-suicida',
  templateUrl: './reporte-conducta-suicida.component.html',
  styleUrls: ['./reporte-conducta-suicida.component.css']
})
export class ReporteConductaSuicidaComponent implements OnInit {
  private meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  private colors = ['#ffcdd2', '#e1bee7', '#bbdefb', '#b2ebf2', '#dcedc8', '#ffe0b2', '#d7ccc8', '#f5f5f5'];
  config = {};

  @Input() update: Subject<number>;
  @Input() currentYear: number;

  private subscriber: Subscription[] = [];

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const subUpdate = this.update.subscribe(year => {
      const subReporte = this._reportesService.getConductaSuicida(year)
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

  private processResp(resp: ReporteConductaSuicida[]) {
    const dataSet = [];

    const labelsUnique = new Set();
    resp.forEach(item => {
      const mes = +item.label;
      labelsUnique.add(this.meses[mes]);
    });

    const labels = Array.from(labelsUnique);
    const dataEmpty = labels.map(l => null);

    resp.forEach(item => {
      const mes = +item.label;
      let find = dataSet.find(d => d.label === item.motivo_consulta_especifico.name);
      if (!find) {
        find = {
          label: item.motivo_consulta_especifico.name,
          data: [...dataEmpty],
          borderColor: this.getColor(dataSet.length),
          backgroundColor: this.getColor(dataSet.length),
        };
        dataSet.push(find);
      }

      find.data[mes - 1] = item.total;
    });

    this.initConfig(labels, dataSet);
  }

  private getColor(index) {
    return this.colors[index];
  }

  private initConfig(labels: any[], dataSets) {
    const data = {
      labels: labels,
      datasets: dataSets
    };

    this.config = Object.assign({}, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          datalabels: {
            color: 'rgba(0,0,0,0.87)',
            align: 'center',
            anchor: 'center',
            // formatter: function (value, context) {
            //   return +value > 0 ? value : '';
            // }
          },
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Conducta Suicida'
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }


}
