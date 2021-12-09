import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private dashboard: DashboardComponent) {}

  ngOnInit() {
    this.dashboard.getUserData().subscribe(resp => {
      this.profileForm.setValue({
        id: resp[0]["id"],
        nombre: resp[0]["nombre"],
        apellido: resp[0]["apellido"],
        correo: resp[0]["correo"],
        rol: resp[0]["rol"]
      });
      this.rol = resp[0]["rol"];
    });
  }
}
