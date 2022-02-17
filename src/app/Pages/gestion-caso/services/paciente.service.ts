import { Injectable } from '@angular/core';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { CoreService } from 'src/app/Services/core.service';
import { DataPacienteModel } from '../models/data-paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _coreService: CoreService) { }


  getDataPaciente() {
    return this._coreService.get<DataPacienteModel>('/init-data-paciente');
  }

  searchPaciente(query: string) {
    return this._coreService.get<PacienteModel[]>('/search-paciente?q=' + query);
  }

  getPacienteById(id: number) {
    return this._coreService.get<PacienteModel>('/paciente/' + id);
  }

}
