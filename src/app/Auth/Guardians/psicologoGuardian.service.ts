import { UserDataService } from 'src/app/user.data.service';
import { LoginService } from '../Login/login.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PsicologoGuardian implements CanActivate {
  constructor(
    private userDataService: UserDataService,
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userDataService
      .getUserDataByEmail(this.loginService.getAuth().email)
      .pipe(
        map(item => {
          if (item[0]['rol'] == 'Psicólogo') {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }
}
