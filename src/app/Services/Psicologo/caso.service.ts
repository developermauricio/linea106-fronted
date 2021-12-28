import { Injectable } from '@angular/core';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  constructor(private _coreService: CoreService) { }

  getAll() {
    return this._coreService.get<PaginateModel<CasoModel>>('/psicologo/casos');
  }

  getById(id) {
    return this._coreService.get<any[]>('/psicologo/casos');
  }
}
