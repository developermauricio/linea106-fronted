import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionReportesRoutingModule } from './gestion-reportes-routing.module';
import { GestionReportesComponent } from './pages/gestion-reportes/gestion-reportes.component';
import { Chart, registerables } from 'chart.js';
import { CharJsComponent } from './components/char-js/char-js.component';
import { ReporteCantidadCasosComponent } from './components/reporte-cantidad-casos/reporte-cantidad-casos.component';

Chart.register(...registerables);
@NgModule({
  declarations: [
    GestionReportesComponent,
    CharJsComponent,
    ReporteCantidadCasosComponent
  ],
  imports: [
    CommonModule,
    GestionReportesRoutingModule
  ]
})
export class GestionReportesModule { }
