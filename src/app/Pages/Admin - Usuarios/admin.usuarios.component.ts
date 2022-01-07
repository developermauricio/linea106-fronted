import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { UserModel } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/Admin/user.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: "app-admin.usuarios",
  templateUrl: "./admin.usuarios.component.html",
  styleUrls: ["./admin.usuarios.component.css"],
})
export class AdminUsuariosComponent implements OnInit {
  psicologos: UserModel[];
  administradores: UserModel[];
  @ViewChild("updateUserForm") updateUserForm: NgForm;
  modalOpen: any;

  currentUser: UserModel;
  currentIndex: number;
  currentType: string;

  constructor(
    private _userService: UserService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this._userService.getPsicologos().subscribe(psicologos => {
      this.psicologos = psicologos;
    });
    this._userService.getAdministradores().subscribe(administradores => {
      this.administradores = administradores;
    });
  }

  openDialog(dialog: TemplateRef<any>, loadUser: Boolean, user: UserModel, index: number, type: string) {
    this.modalOpen = this.dialogService.open(dialog);
    if (loadUser) {
      this.currentUser = user;
      this.currentIndex = index;
      this.currentType = type;
      this.loadUser();
    }
  }

  addUser(createUserForm: NgForm) {
    let newUser = createUserForm.value;
    this._userService
      .store(newUser).subscribe((resp) => {

        if (resp.rol === 'Administrador') {
          this.administradores.unshift(resp);
        } else {
          this.psicologos.unshift(resp);
        }

        this.modalOpen.close();
        this.toastrService.show(
          newUser.rol + " creado correctamente",
          "Éxito",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "success",
            icon: "checkmark",
            iconPack: "eva",
          }
        );
      }, (error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }

  loadUser() {
    this._userService.getById(this.currentUser.id).subscribe((user) => {
      this.currentUser = user;
      this.updateUserForm.setValue({
        id: user.identificacion,
        nombre: user.name,
        apellido: user.last_name,
        correo: user.email,
        rol: user.rol,
      });
    });
  }

  updateUser(updateUserForm: NgForm) {
    let userToUpdate = updateUserForm.value;
    this._userService
      .update(this.currentUser.id, userToUpdate)
      .subscribe((user) => {
        if (user.rol === 'Administrador') {
          if (this.currentType === 'admin') {
            this.administradores.splice(this.currentIndex, 1, user);
          } else {
            this.psicologos.splice(this.currentIndex, 1);
            this.administradores.push(user);
          }
        } else {
          if (this.currentType === 'admin') {
            this.administradores.splice(this.currentIndex, 1);
            this.psicologos.push(user);
          } else {
            this.psicologos.splice(this.currentIndex, 1, user);
          }
        }

        this.modalOpen.close();
        this.toastrService.show(
          "Usuario " + userToUpdate.rol + " actualizado correctamente",
          "Éxito",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "success",
            icon: "checkmark",
            iconPack: "eva",
          }
        );
      }, (error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      }
      );
  }

  recoverPassword(correo: string) {
    this._loginService
      .recoverPassword(correo);
  }

  deleteUser() {
    this._userService
      .delete(this.currentUser.id)
      .subscribe(() => {
        if (this.currentType === 'admin') {
          this.administradores.splice(this.currentIndex, 1);
        } else {
          this.psicologos.splice(this.currentIndex, 1);
        }

        this.modalOpen.close();
        this.toastrService.show("Usuario eliminado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          iconPack: "eva",
        });
      }, (error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }

  get showDelete() {
    if (!this.currentUser) {
      return false;
    }

    const created = new Date(this.currentUser.created_at).getTime();
    const current = ((new Date()).getTime() - (60000 * 60 * 24));

    return (created - current) >= 0;
  }

  getEstado(id) {
    return Boolean(Number(id));
  }

  updateEstatus(status: boolean, index: number, type: string) {
    let user: UserModel = null;
    if (type === 'admin') {
      user = this.administradores[index];
    } else {
      user = this.psicologos[index];
    }

    user.estado = status;

    this._userService.toggleStatus(user.id).subscribe(resp => {
      Object.assign(user, resp);
      this.toastrService.show("Estado actualizado", "Éxito", {
        destroyByClick: true,
        preventDuplicates: true,
        status: "success",
        icon: "checkmark",
        iconPack: "eva",
      });
    }, err => {
      user.estado = false;
      this.toastrService.show(err.message, "Error", {
        destroyByClick: true,
        preventDuplicates: true,
        status: "danger",
        icon: "alert-triangle",
        iconPack: "eva",
      });
    });

  }

}
