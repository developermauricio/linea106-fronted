import { DashboardComponent } from '../../Dashboard/dashboard.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-psicologo.perfil',
  templateUrl: './psicologo.perfil.component.html',
  styleUrls: ['./psicologo.perfil.component.css']
})
export class PsicologoPerfilComponent implements OnInit {

  @ViewChild("miPerfil") profileForm: NgForm;

  rol = "";

  constructor(
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._loginService.user.subscribe(user => {
        this.profileForm.setValue({
          identificacion: user.identificacion || 'N/A',
          nombre: user.name,
          apellido: user.last_name,
          correo: user.email,
          rol: user.rol
        });
        this.rol = user.rol;
      });
    }, 200);
  }
}
