import { Injectable } from '@angular/core';
import { AnuncioModel } from 'src/app/Models/anuncio.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private _coreService: CoreService) { }

  getAll() {
    return this._coreService.get<AnuncioModel[]>('/psicologo/anuncios');
  }
}
