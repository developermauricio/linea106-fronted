import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { LoginModel } from '../Models/login.model';
import { UserModel } from '../Models/user.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(
    private _router: Router,
    private _coreService: CoreService,
    private toastrService: NbToastrService,
  ) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user.next(JSON.parse(userJson));
    }
    this.getAuthUser();
  }

  login(correo: string, clave: string): void {
    const data = {
      username: correo,
      password: clave
    };

    this._coreService.post<LoginModel>('/login', data)
      .subscribe(tokenLogin => {
        this.toastrService.show(
          'Login correcto',
          "Success",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "success",
            icon: "alert-triangle",
            iconPack: "eva"
          }
        );
        this._coreService.setLogin(tokenLogin);
        this.getAuthUser();
      }, err => {
        this.user.next(null);
        if (err.status == 422) {
          const errores = err.error?.errors;
          if (errores) {
            const keyErrors = Object.keys(err.error.errors);
            this.toastrService.show(
              errores[keyErrors[0]].join(','),
              "Error",
              {
                destroyByClick: true,
                preventDuplicates: true,
                status: "danger",
                icon: "alert-triangle",
                iconPack: "eva"
              }
            );
          }
        } else if (err.status == 400) {
          this.toastrService.show(
            'Usuario o contraseña invalido',
            "Error",
            {
              destroyByClick: true,
              preventDuplicates: true,
              status: "danger",
              icon: "alert-triangle",
              iconPack: "eva"
            }
          );
        } else {
          console.error(err);
          this.toastrService.show(
            err.error.message,
            "Error",
            {
              destroyByClick: true,
              preventDuplicates: true,
              status: "danger",
              icon: "alert-triangle",
              iconPack: "eva"
            }
          );
        }
      });
  }

  private getAuthUser() {
    if (!this._coreService.hasToken()) {
      localStorage.removeItem('user');
      this.user.next(null);
      this.logout();
      return;
    }
    this._coreService.get<UserModel>('/user')
      .subscribe(user => {
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }, err => {
        localStorage.removeItem('user');
        this.user.next(null);
        this.logout();
      });
  }

  logout() {
    if (this._coreService.hasToken()) {
      this._coreService.post('/logout')
        .subscribe(res => {
          this.user.next(null);
          this._coreService.setLogin(null);
          this._router.navigate(["/login"]);
        }, err => {
          this.user.next(null);
          this._coreService.setLogin(null);
          this._router.navigate(["/login"]);
        });
    }
  }

  recoverPassword(correo: string) {
    console.error("Error al enviar correo, falta implementar");
  }


}
