import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/Models/user.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _coreService: CoreService) { }


  getAdministradores() {
    return this._coreService.get<UserModel[]>('/admin/administradores');
  }

  getPsicologos() {
    return this._coreService.get<UserModel[]>('/admin/psicologos');
  }

  store(user: UserModel) {
    return this._coreService.post<UserModel>('/admin/users', user);
  }

  update(id: number, user: UserModel) {
    return this._coreService.put<UserModel>('/admin/users/' + id, user);
  }

  getById(id: number) {
    return this._coreService.get<UserModel>('/admin/users/' + id);
  }

  delete(id: number) {
    return this._coreService.delete<void>('/admin/users/' + id);
  }

  toggleStatus(id: number){
    return this._coreService.put<UserModel>('/admin/users/toggle_status/' + id);
  }

}
