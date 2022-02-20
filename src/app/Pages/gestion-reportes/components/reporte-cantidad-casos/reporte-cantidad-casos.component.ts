import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reporte-cantidad-casos',
  templateUrl: './reporte-cantidad-casos.component.html',
  styleUrls: ['./reporte-cantidad-casos.component.css']
})
export class ReporteCantidadCasosComponent implements OnInit {

  private meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  config = {};

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    this._reportesService.getCasosMes().subscribe(resp => {
      const labels = [];
      const data = [];

      resp.forEach(item => {
        labels.push(this.meses[+item.label]);
        data.push(item.total);
      });


      this.initConfig(labels, data);
    });
  }

  private initConfig(labels, dataUsers) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Usuarios',
          data: dataUsers,
          borderColor: "#3080d0",
          backgroundColor: '#3080f0',
          order: 1
        },
        // {
        //   label: 'Dataset 2',
        //   data: [1, 7, 9, 7, 5, 6, 7],
        //   borderColor: '#418ad4',
        //   backgroundColor: '#418ad4',
        //   type: 'line',
        //   order: 0
        // }
      ]
    };

    this.config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Numero de usuarios mes a mes'
          }
        }
      },
    };
  }

}
