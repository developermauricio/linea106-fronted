import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-char-js',
  templateUrl: './char-js.component.html',
  styleUrls: ['./char-js.component.css']
})
export class CharJsComponent implements OnInit {

  @ViewChild("charJs") elementChart: ElementRef;

  private _config;

  get config(): any {
    return this._config;
  }

  @Input()
  set config(val: any) {
    this._config = val;
    this.drawChart();
  }

  private chart = null;

  constructor() { }

  ngOnInit(): void {
    this.drawInit();
  }

  drawInit() {
    setTimeout(() => {
      if (!this.elementChart || !this.elementChart.nativeElement) {
        this.drawInit();
      } else {
        this.drawChart();
      }
    }, 20);
  }

  drawChart() {
    if (!this.elementChart || !this.elementChart.nativeElement) {
      return;
    }
    if (this.chart) {
      this.chart.destroy();
    }
    const chart = new Chart(this.elementChart.nativeElement, this.config);
    this.chart = chart;
  }

}
