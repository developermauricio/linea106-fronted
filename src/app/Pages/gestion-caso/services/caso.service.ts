import { Injectable } from '@angular/core';
import { CasoModel } from 'src/app/Models/caso.model';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { CoreService } from 'src/app/Services/core.service';
import { DataCaseModel } from '../models/data-case.model';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  constructor(private _coreService: CoreService) { }

  getOptionsCase() {
    return this._coreService.get<DataCaseModel>('/init-data-case');
  }

  getById(id: number) {
    return this._coreService.get<CasoModel>('/cases/' + id);
  }

  createOrUpdateCase(dataCase: CasoModel, dataPaciente: PacienteModel) {
    return this._coreService.post<{ caso: CasoModel, paciente: PacienteModel; }>('/cases', { caso: dataCase, paciente: dataPaciente });
  }

}
