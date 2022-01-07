import { Injectable } from '@angular/core';
import { CasoModel } from 'src/app/Models/caso.model';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class CasoService {
  constructor(private _coreService: CoreService) { }

  getAll(params: string) {
    return this._coreService.get<PaginateModel<CasoModel>>('/casos?' + params);
  }
}
