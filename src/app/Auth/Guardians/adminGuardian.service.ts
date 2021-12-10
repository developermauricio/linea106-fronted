import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/Services/login.service';

@Injectable()
export class AdminGuardian implements CanActivate {
  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this._loginService.user.pipe(
      map(user => {
        if (user && user.rol == 'Administrador') {
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
