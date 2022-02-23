import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionReportesRoutingModule } from './gestion-reportes-routing.module';
import { GestionReportesComponent } from './pages/gestion-reportes/gestion-reportes.component';
import { Chart, registerables } from 'chart.js';
import { CharJsComponent } from './components/char-js/char-js.component';
import { ReporteCantidadCasosComponent } from './components/reporte-cantidad-casos/reporte-cantidad-casos.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormsModule } from '@angular/forms';
import { ReporteConductaSuicidaComponent } from './components/reporte-conducta-suicida/reporte-conducta-suicida.component';
import { ReporteMenoresComponent } from './components/reporte-menores/reporte-menores.component';
import { ReporteMesPsicologosComponent } from './components/reporte-mes-psicologos/reporte-mes-psicologos.component';
import { ReporteMesOrigenComponent } from './components/reporte-mes-origen/reporte-mes-origen.component';

Chart.register(...registerables);
Chart.register(ChartDataLabels);
@NgModule({
  declarations: [
    GestionReportesComponent,
    CharJsComponent,
    ReporteCantidadCasosComponent,
    ReporteConductaSuicidaComponent,
    ReporteMenoresComponent,
    ReporteMesPsicologosComponent,
    ReporteMesOrigenComponent
  ],
  imports: [
    CommonModule,
    GestionReportesRoutingModule,
    FormsModule
  ]
})
export class GestionReportesModule { }
