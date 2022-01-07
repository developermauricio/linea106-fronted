import { Injectable } from '@angular/core';
import { UserModel, UserUpdateModel } from 'src/app/Models/user.model';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _coreService: CoreService) { }

  public updateProfile(user: UserUpdateModel) {
    return this._coreService.put<UserModel>('/update_profile', user);
  }

}
