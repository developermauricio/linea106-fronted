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
        setTimeout(() => {
          this.toastrService.show(
            'Login correcto',
            "Success",
            {
              destroyByClick: true,
              preventDuplicates: true,
              status: "success",
              icon: "alert-triangle",
              // iconPack: "eva"
            }
          );
        }, 200);
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
                // iconPack: "eva"
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
              // iconPack: "eva"
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
              // iconPack: "eva"
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
    this._coreService.post('/password/email', { email: correo }).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }


  resetPassword(token: string, email: string, password: string, password_confirmation: string) {
    const data = {
      token,
      email,
      password,
      password_confirmation
    };

    this._coreService.post('/password/reset', data).subscribe(resp => {
      this._router.navigate(["/login"]);
      setTimeout(() => {
        this.toastrService.show(
          'Contraseña cambiada',
          "Success",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "success",
            icon: "alert-triangle",
            // iconPack: "eva"
          }
        );
      }, 200);
    }, err => {
      let error = err.error.message;
      if (err.status === 422 && err.error && err.error.errors) {
        const key = Object.keys(err.error.errors);
        error = err.error.errors[key[0]].join(',');
      }
      this.toastrService.show(
        error,
        "Error",
        {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          // iconPack: "eva"
        }
      );
    });
  }

}
