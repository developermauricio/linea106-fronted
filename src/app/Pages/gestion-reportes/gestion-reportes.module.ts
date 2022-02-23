import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CharJsComponent } from './components/char-js/char-js.component';
import { ReporteCantidadCasosComponent } from './components/reporte-cantidad-casos/reporte-cantidad-casos.component';
import { ReporteConductaSuicidaComponent } from './components/reporte-conducta-suicida/reporte-conducta-suicida.component';
import { ReporteMenoresComponent } from './components/reporte-menores/reporte-menores.component';
import { ReporteMesEdadComponent } from './components/reporte-mes-edad/reporte-mes-edad.component';
import { ReporteMesOrigenComponent } from './components/reporte-mes-origen/reporte-mes-origen.component';
import { ReporteMesPsicologosComponent } from './components/reporte-mes-psicologos/reporte-mes-psicologos.component';
import { ReporteMesTipoPacienteComponent } from './components/reporte-mes-tipo-paciente/reporte-mes-tipo-paciente.component';
import { ReporteMesTurnosComponent } from './components/reporte-mes-turnos/reporte-mes-turnos.component';
import { GestionReportesRoutingModule } from './gestion-reportes-routing.module';
import { GestionReportesComponent } from './pages/gestion-reportes/gestion-reportes.component';


Chart.register(...registerables);
Chart.register(ChartDataLabels);
@NgModule({
  declarations: [
    CharJsComponent,
    GestionReportesComponent,
    ReporteCantidadCasosComponent,
    ReporteConductaSuicidaComponent,
    ReporteMenoresComponent,
    ReporteMesPsicologosComponent,
    ReporteMesOrigenComponent,
    ReporteMesTipoPacienteComponent,
    ReporteMesTurnosComponent,
    ReporteMesEdadComponent
  ],
  imports: [
    CommonModule,
    GestionReportesRoutingModule,
    FormsModule
  ]
})
export class GestionReportesModule { }
