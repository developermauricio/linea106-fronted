import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReporteMesTipoPaciente } from '../../models/reporte-mes-tipo-paciente';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-mes-tipo-paciente',
  templateUrl: './reporte-mes-tipo-paciente.component.html',
  styleUrls: ['./reporte-mes-tipo-paciente.component.css']
})
export class ReporteMesTipoPacienteComponent implements OnInit {

  config = {};

  @Input() update: Subject<string>;
  @Input() currentYear: number;

  total = 0;

  private subscriber: Subscription[] = [];

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const subUpdate = this.update.subscribe(year => {
      const subReporte = this._reportesService.getCasosTipoPacienteByMes(year)
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

  private processResp(resp: ReporteMesTipoPaciente[]) {
    const labels = [];
    const data = [];

    this.total = 0;
    resp.forEach(item => {
      labels.push(item.name);
      data.push(item.total);
      this.total += item.total;
    });
    this.initConfig(labels, data);
  }

  private initConfig(labels, dataUsers) {
    const colors = ['#bbdefb', '#dcedc8', '#ffe0b2', '#d7ccc8', '#f5f5f5'];
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
      type: 'pie',
      data: data,
      options: {
        scales: {
          y: {
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
            position: 'bottom'
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
