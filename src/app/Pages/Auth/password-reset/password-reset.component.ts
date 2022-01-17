import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(
    private _activateRoute: ActivatedRoute,
    private _loginService: LoginService
  ) { }

  public email = null;
  public password = null;
  public password_confirmation = null;
  private token = null;

  ngOnInit() {
    this._activateRoute.queryParams.subscribe(params => {
      this.email = params.email;
    });

    this._activateRoute.params.subscribe(params => {
      this.token = params.token;
    });
  }

  resetPassword() {
    if (!this.email || !this.token) {
      console.log("Error al recuperar el email");
      return;
    }

    if (this.password != this.password_confirmation) {
      console.log("Las contraseñas no son iguales");
      return;
    }


    this._loginService.resetPassword(this.token, this.email, this.password, this.password_confirmation);
  }

}
