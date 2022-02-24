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
import { ReporteMesEscolaridadComponent } from './components/reporte-mes-escolaridad/reporte-mes-escolaridad.component';
import { ReporteMesSexoComponent } from './components/reporte-mes-sexo/reporte-mes-sexo.component';
import { ReporteMesZonaComponent } from './components/reporte-mes-zona/reporte-mes-zona.component';
import { ReporteMesOcupacionComponent } from './components/reporte-mes-ocupacion/reporte-mes-ocupacion.component';
import { ReporteMesGeneroComponent } from './components/reporte-mes-genero/reporte-mes-genero.component';
import { ReporteMesMotivoEspecificoComponent } from './components/reporte-mes-motivo-especifico/reporte-mes-motivo-especifico.component';
import { ReporteMesCiudadComponent } from './components/reporte-mes-ciudad/reporte-mes-ciudad.component';


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
    ReporteMesEdadComponent,
    ReporteMesEscolaridadComponent,
    ReporteMesSexoComponent,
    ReporteMesZonaComponent,
    ReporteMesOcupacionComponent,
    ReporteMesGeneroComponent,
    ReporteMesMotivoEspecificoComponent,
    ReporteMesCiudadComponent
  ],
  imports: [
    CommonModule,
    GestionReportesRoutingModule,
    FormsModule
  ]
})
export class GestionReportesModule { }
