import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { UserDataService } from "src/app/user.data.service";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { LoginService } from "src/app/Auth/Login/login.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-admin.usuarios",
  templateUrl: "./admin.usuarios.component.html",
  styleUrls: ["./admin.usuarios.component.css"],
})
export class AdminUsuariosComponent implements OnInit {
  psicologos: Observable<any[]>;
  administradores: Observable<any[]>;
  @ViewChild("updateUserForm") updateUserForm: NgForm;
  modalOpen: any;

  constructor(
    private userDataService: UserDataService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.psicologos = this.userDataService.getUsersPsicologos();
    this.administradores = this.userDataService.getUsersAdmin();
  }

  openDialog(dialog: TemplateRef<any>, loadUser: Boolean, id?: string) {
    this.modalOpen = this.dialogService.open(dialog);
    if (loadUser) {
      this.loadUser(id);
    }
  }

  addUser(createUserForm: NgForm) {
    let newUser = createUserForm.value;
    this.loginService
      .createUser(createUserForm.value.correo, createUserForm.value.clave)
      .then((res) => {
        this.userDataService
          .addUser(newUser)
          .then((resp) => {
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
          })
          .catch((error) => {
            this.toastrService.show(error.message, "Error", {
              destroyByClick: true,
              preventDuplicates: true,
              status: "danger",
              icon: "alert-triangle",
              iconPack: "eva",
            });
          });
      })
      .catch((error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }

  loadUser(id: string) {
    this.userDataService.getUserById(id).subscribe((result) => {
      this.updateUserForm.setValue({
        id: result[0]["id"],
        nombre: result[0]["nombre"],
        apellido: result[0]["apellido"],
        correo: result[0]["correo"],
        rol: result[0]["rol"],
      });
    });
  }

  updateUser(updateUserForm: NgForm) {
    let userToUpdate = updateUserForm.value;
    this.userDataService
      .updateUser(userToUpdate)
      .then((resp) => {
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
      })
      .catch((error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }

  recoverPassword(correo: string) {
    this.loginService
      .recoverPassword(correo)
      .then((resp) => {
        this.modalOpen.close();
        this.toastrService.show(
          "Correo de recuperación enviado correctamente",
          "Éxito",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "success",
            icon: "checkmark",
            iconPack: "eva",
          }
        );
      })
      .catch((error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }

  deleteUser(id: string) {
    this.userDataService
      .deleteUser(id)
      .then((resp) => {
        this.modalOpen.close();
        this.toastrService.show("Usuario eliminado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          iconPack: "eva",
        });
      })
      .catch((error) => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }
}
