import { Injectable } from '@angular/core';
import { StatisticsModel } from 'src/app/Models/statistic.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  constructor(private _coreService: CoreService) { }

  getStatisticsByDate(fechaInicio, fechaFin) {
    return this._coreService.get<StatisticsModel>(`/statics?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }
}
