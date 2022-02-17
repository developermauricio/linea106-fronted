import { Injectable } from '@angular/core';
import { CasoModel } from 'src/app/Models/caso.model';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { PsicologoStatisticModel } from 'src/app/Models/psicologo-statistic.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  constructor(private _coreService: CoreService) { }

  getAll(params: string) {
    return this._coreService.get<PaginateModel<CasoModel>>('/casos?' + params);
  }

  getMisCasos(params: string) {
    return this._coreService.get<PaginateModel<CasoModel>>('/casos?mis_casos=1&' + params);
  }

  getById(id) {
    return this._coreService.get<CasoModel>(`/show-case/${id}`);
  }

  delete(id) {
    return this._coreService.delete<any[]>('/psicologo/casos');
  }


  getStatisticsByDate(fechaInicio, fechaFin) {
    return this._coreService.get<PsicologoStatisticModel>(`/statics?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  }
}
