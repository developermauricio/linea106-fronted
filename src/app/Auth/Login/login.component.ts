import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "../../Services/login.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private loginService: LoginService,
    private _router: Router
  ) { }

  private subcriberUser: Subscription;

  correo: string;
  clave: string;

  ngOnInit() {
    this.logout();
    this.subcriberUser = this.loginService.user.subscribe(user => {
      if (user) {
        if (user.rol == "Administrador") {
          this._router.navigate(["/inicio"]);
        } else if (user.rol == "Psicólogo") {
          this._router.navigate(["/anuncios"]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subcriberUser) {
      this.subcriberUser.unsubscribe();
    }
  }

  login() {
    this.loginService.login(this.correo, this.clave);
  }

  logout() {
    this.loginService.logout();
  }
}
