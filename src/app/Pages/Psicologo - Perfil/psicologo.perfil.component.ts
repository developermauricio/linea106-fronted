import { DashboardComponent } from '../../Dashboard/dashboard.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-psicologo.perfil',
  templateUrl: './psicologo.perfil.component.html',
  styleUrls: ['./psicologo.perfil.component.css']
})
export class PsicologoPerfilComponent implements OnInit {
  @ViewChild("miPerfil") profileForm: NgForm;
  userData: any[];
  rol = "";

  constructor(
    private dashboard: DashboardComponent,
  ) { }

  ngOnInit() {
    this.dashboard.getUserData().subscribe( resp => {
      this.profileForm.setValue({
        id: resp[0]["id"],
        nombre: resp[0]["nombre"],
        apellido: resp[0]["apellido"],
        correo: resp[0]["correo"],
        rol: resp[0]["rol"],
      });
      this.rol = resp[0]["rol"];
    })
  }
}
