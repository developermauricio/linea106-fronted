import { Injectable } from '@angular/core';
import { TipoModel } from 'src/app/Models/tipo.model';
import { CoreService } from 'src/app/Services/core.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _coreService: CoreService) { }

  municipioByDepartamento(idDepartamento: number, query: string) {
    return this._coreService.get<TipoModel[]>(`/municipios/${idDepartamento}?query=${query}`);
  }

  veredaByMunicipio(idMunicipio: number, query: string) {
    return this._coreService.get<TipoModel[]>(`/veredas/${idMunicipio}?query=${query}`);
  }
}
