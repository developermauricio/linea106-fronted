import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UserService } from 'src/app/Services/Common/user.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-psicologo.perfil',
  templateUrl: './psicologo.perfil.component.html',
  styleUrls: ['./psicologo.perfil.component.css']
})
export class PsicologoPerfilComponent implements OnInit {

  @ViewChild("miPerfil") profileForm: NgForm;

  rol = "";

  modalOpen;
  formProfile: FormGroup;

  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _nbDialogService: NbDialogService,
    private _nbToastrService: NbToastrService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formProfile = this._formBuilder.group({
      old_password: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });

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

  updatePassword() {
    const user = JSON.parse('{}');
    Object.assign(user, this.formProfile.value);

    this._userService.updateProfile(user).subscribe(() => {
      this._nbToastrService.show("Se ha actualizado la contraseña", "Éxito", {
        destroyByClick: true,
        preventDuplicates: true,
        status: "success",
        icon: "checkmark",
        // iconPack: "eva"
      });
      this.modalOpen.close();
      this.formProfile.reset();
    }, err => {
      let msg = "Error en el servidor";
      if (err.status == 422 && err.error && err.error.errors) {
        const key = Object.keys(err.error.errors);
        msg = err.error.errors[key[0]].join(',');
      }
      console.error('error', err);

      this._nbToastrService.show(msg, "Error", {
        destroyByClick: true,
        preventDuplicates: true,
        status: "danger",
        icon: "alert-triangle",
        // iconPack: "eva",
      });
    });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.modalOpen = this._nbDialogService.open(dialog, { context: this });
  }
}
