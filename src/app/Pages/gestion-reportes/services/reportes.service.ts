import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/Services/core.service';
import { ReporteCasos } from '../models/reporte-casos';
import { ReporteConductaSuicida } from '../models/reporte-conducta-suicida';
import { ReporteMenores } from '../models/reporte-menores';
import { ReporteMesOrigen } from '../models/reporte-mes-origen';
import { ReporteMesPsicologos } from '../models/reporte-mes-psicologos';

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
}
