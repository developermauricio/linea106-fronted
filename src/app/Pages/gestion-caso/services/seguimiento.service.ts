import { Injectable } from '@angular/core';
import { SeguimientoModel } from 'src/app/Models/seguimiento.model';
import { CoreService } from 'src/app/Services/core.service';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  constructor(private _coreService: CoreService) { }

  getSeguimientos(idCase: number) {
    return this._coreService.get<SeguimientoModel[]>('/get-seguimientos/' + idCase);
  }

  storeSeguimiento(seguimiento: SeguimientoModel) {
    return this._coreService.post<SeguimientoModel>('/store-seguimiento', seguimiento);
  }
}
