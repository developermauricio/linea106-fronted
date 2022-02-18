import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-reportes',
  templateUrl: './gestion-reportes.component.html',
  styleUrls: ['./gestion-reportes.component.css']
})
export class GestionReportesComponent implements OnInit {

  data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  config = {
    type: 'bar',
    data: this.data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

  cambiarImagen(){
    const data = Object.assign({}, this.config);
    data.data.datasets[0].data = [3, 3, 3, 4, 4, 3, 3];
    this.config = data;
  }

}
