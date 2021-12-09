import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { NbToastrService } from "@nebular/theme";
import { Router } from "@angular/router";
import { UserDataService } from "src/app/user.data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private toastrService: NbToastrService,
    private userDataService: UserDataService,
    private loginService: LoginService,
    private router: Router
  ) {}

  isLoggin: boolean;
  isAdmin: boolean;
  correo: string;
  clave: string;

  ngOnInit() {
    this.isLoggin = false;
    if(this.loginService.isLogged){
      this.loginService.logout();
    }
    
  }

  login() {
    this.loginService
      .login(this.correo, this.clave)
      .then(res => {
        this.userDataService
          .getUserDataByEmail(this.loginService.getAuth().email)
          .subscribe(item => {
            if (item[0]) {
              this.isLoggin = true;
              if (item[0]["rol"] == "Administrador") {
                this.router.navigate(["/inicio"]);
              } else if (item[0]["rol"] == "Psicólogo") {
                this.router.navigate(["/anuncios"]);
              }
            } else {
              this.isLoggin = false;
              this.toastrService.show(
                "Usuario no registrado en la base de datos",
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
      })
      .catch(error => {
        this.isLoggin = false;
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva"
        });
      });
  }

  logout() {
    this.loginService.logout();
  }
}
