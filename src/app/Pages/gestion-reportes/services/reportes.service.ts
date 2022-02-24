import { Injectable } from '@angular/core';
import { TipoModel } from 'src/app/Models/tipo.model';
import { CoreService } from 'src/app/Services/core.service';
import { ReporteBase } from '../models/reporte-base';
import { ReporteCasos } from '../models/reporte-casos';
import { ReporteConductaSuicida } from '../models/reporte-conducta-suicida';
import { ReporteMenores } from '../models/reporte-menores';
import { ReporteMesEdad } from '../models/reporte-mes-edad';
import { ReporteMesOrigen } from '../models/reporte-mes-origen';
import { ReporteMesPsicologos } from '../models/reporte-mes-psicologos';
import { ReporteMesTipoPaciente } from '../models/reporte-mes-tipo-paciente';
import { ReporteMesTurno } from '../models/reporte-mes-turno';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private _coreService: CoreService) { }

  getCasosPorMes(year: number) {
    return this._coreService.get<ReporteCasos[]>('/reportes-casos?y=' + year);
  }

  getConductaSuicida(year: number) {
    return this._coreService.get<ReporteConductaSuicida[]>('/reporte-conducta-suicida?y=' + year);
  }

  getReporteMenores(year: number) {
    return this._coreService.get<ReporteMenores[]>('/reporte-menores?y=' + year);
  }

  getCasosPsicologoByMes(date: string) {
    return this._coreService.get<ReporteMesPsicologos[]>('/mes/psicologo?d=' + date);
  }

  getCasosOrigenByMes(date: string) {
    return this._coreService.get<ReporteMesOrigen[]>('/mes/origen?d=' + date);
  }

  getCasosTipoPacienteByMes(date: string) {
    return this._coreService.get<ReporteMesTipoPaciente[]>('/mes/tipo-paciente?d=' + date);
  }

  getCasosTurnosByMes(date: string) {
    return this._coreService.get<ReporteMesTurno[]>('/mes/turno?d=' + date);
  }

  getCasosEdadByMes(date: string) {
    return this._coreService.get<ReporteMesEdad[]>('/mes/edad?d=' + date);
  }

  getCasosEscolaridadByMes(date: string) {
    return this._coreService.get<ReporteBase[]>('/mes/escolaridad?d=' + date);
  }

  getCasosCiudadByMes(date: string) {
    return this._coreService.get<ReporteBase[]>('/mes/ciudad?d=' + date);
  }

  getCasosSexoByMes(date: string) {
    return this._coreService.get<ReporteBase[]>('/mes/sexo?d=' + date);
  }

  getCasosZonaByMes(date: string) {
    return this._coreService.get<ReporteBase[]>('/mes/zona?d=' + date);
  }

  getCasosOcupacionByMes(date: string) {
    return this._coreService.get<ReporteBase[]>('/mes/ocupacion?d=' + date);
  }

  getCasosGeneroByMes(date: string) {
    return this._coreService.get<ReporteBase[]>('/mes/genero?d=' + date);
  }

  getCasosMotivoEspecificoByMes(date: string, motivo_id: number) {
    return this._coreService.get<ReporteBase[]>(`/mes/motivo-especifico?d=${date}&motivo=${motivo_id}`);
  }

  getAllMotivosConsulta() {
    return this._coreService.get<TipoModel[]>(`/get-motivos-consulta-reportes`);
  }
}
