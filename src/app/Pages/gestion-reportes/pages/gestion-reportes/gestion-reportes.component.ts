import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-reportes',
  templateUrl: './gestion-reportes.component.html',
  styleUrls: ['./gestion-reportes.component.css']
})
export class GestionReportesComponent implements OnInit {

  updateGraphicYear = new Subject<number>();
  updateGraphicMonth = new Subject<string>();

  currentYear = 0;
  years = [];
  year = null;
  month = null;

  constructor() { }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    this.currentYear = year;
    for (let i = 2018; i <= year; i++) {
      this.years.push(i);
    }
    this.years = this.years.reverse();
  }

  updateReportYear() {
    this.updateGraphicYear.next(this.year);
  }

  updateReportMonth() {
    this.updateGraphicMonth.next(this.month);
  }

}
