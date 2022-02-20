import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/Services/core.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private _coreService: CoreService) { }

  getCasosMes() {
    return this._coreService.get<any[]>('/reports');
  }
}
