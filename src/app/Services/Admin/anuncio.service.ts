import { Injectable } from '@angular/core';
import { AnuncioModel } from 'src/app/Models/anuncio.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private _coreService: CoreService) { }

  getAll() {
    return this._coreService.get<AnuncioModel[]>(`/admin/anuncios`);
  }

  getById(id: number) {
    return this._coreService.get<AnuncioModel>(`/admin/anuncios/${id}`);
  }

  store(data: AnuncioModel) {
    return this._coreService.post<AnuncioModel>(`/admin/anuncios`, data);
  }

  update(id: number, data: AnuncioModel) {
    return this._coreService.put<AnuncioModel>(`/admin/anuncios/${id}`, data);
  }

  delete(id: number) {
    return this._coreService.delete<void>(`/admin/anuncios/${id}`);
  }

}
