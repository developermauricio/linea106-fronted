import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { DashboardComponent } from '../../Dashboard/dashboard.component';

@Component({
  selector: "app-admin.mi.perfil",
  templateUrl: "./admin.mi.perfil.component.html",
  styleUrls: ["./admin.mi.perfil.component.css"]
})
export class AdminMiPerfilComponent implements OnInit {
  @ViewChild("miPerfil") profileForm: NgForm;
  userData: any[];
  rol = "";

  constructor(
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this._loginService.user.subscribe(user => {
      console.log(user);
      this.profileForm.setValue({
        id: user.id,
        nombre: user.name,
        apellido: user.last_name,
        correo: user.email,
        rol: user.rol
      });
      this.rol = user.rol;
    });
  }
}
