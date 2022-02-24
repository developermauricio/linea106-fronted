import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TipoModel } from 'src/app/Models/tipo.model';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-gestion-reportes',
  templateUrl: './gestion-reportes.component.html',
  styleUrls: ['./gestion-reportes.component.css']
})
export class GestionReportesComponent implements OnInit {

  motivosConsulta: TipoModel[] = [];
  updateGraphicYear = new Subject<number>();
  updateGraphicMonth = new Subject<string>();

  currentYear = 0;
  years = [];
  year = null;
  month = null;

  constructor(private _reportesService: ReportesService) { }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    this.currentYear = year;
    for (let i = 2018; i <= year; i++) {
      this.years.push(i);
    }
    this.years = this.years.reverse();

    this._reportesService.getAllMotivosConsulta().subscribe(motivos => {
      this.motivosConsulta = motivos;
    });
  }

  updateReportYear() {
    this.updateGraphicYear.next(this.year);
  }

  updateReportMonth() {
    this.updateGraphicMonth.next(this.month);
  }

}
