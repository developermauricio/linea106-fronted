import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-psicologo.crear.caso",
  templateUrl: "./psicologo.crear.caso.component.html",
  styleUrls: ["./psicologo.crear.caso.component.css"],
})
export class PsicologoCrearCasoComponent implements OnInit {
  @ViewChild("createUsuarioForm") createUsuarioForm: NgForm;
  nuevoPaciente: boolean = false;
  sentButton: boolean = false;

  constructor(
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  addCase(createCaseForm: NgForm) {
    // this.sentButton = true;
    // const newCase = createCaseForm.value;
    // newCase["fecha_inicio"] = new Date(newCase["fecha_inicio"]).getTime();
    // newCase["fecha_fin"] = new Date(newCase["fecha_fin"]).getTime();
    // newCase["ultima_actualizacion"] = new Date().valueOf();
    // // newCase["psicologo"] = this.psicologo;
    // if (newCase["tipo_paciente"] === "Usuario nuevo") {
    //   const newPatient = this.createUsuarioForm.value;
    //   if (newPatient.id) {
    //     newCase["paciente"] = newPatient.id;
    //     this.patientDataService
    //       .addPatientWithId(newPatient)
    //       .then((resp) => {
    //         this.caseDataService
    //           .addCase(newCase)
    //           .then((resp) => {
    //             this.resetForms();
    //             this.toastrService.show(
    //               "Caso y usuario registrados correctamente",
    //               "Éxito",
    //               {
    //                 destroyByClick: true,
    //                 preventDuplicates: true,
    //                 status: "success",
    //                 icon: "checkmark",
    //                 // iconPack: "eva",
    //               }
    //             );
    //           })
    //           .catch((error) => {
    //             this.toastrService.show(
    //               "El caso no pudo ser creado, verifique los datos ingresados e intente nuevamente",
    //               "Error",
    //               {
    //                 destroyByClick: true,
    //                 preventDuplicates: true,
    //                 status: "danger",
    //                 icon: "alert-triangle",
    //                 // iconPack: "eva",
    //               }
    //             );
    //             console.log(error);
    //           });
    //       })
    //       .catch((error) => {
    //         this.toastrService.show(
    //           "El usuario no pudo ser creado, verifique los datos ingresados e intente nuevamente",
    //           "Error",
    //           {
    //             destroyByClick: true,
    //             preventDuplicates: true,
    //             status: "danger",
    //             icon: "alert-triangle",
    //             // iconPack: "eva",
    //           }
    //         );
    //         console.log(error);
    //       });
    //   } else {
    //     this.patientDataService
    //       .addPatient(newPatient)
    //       .then((resp) => {
    //         newCase["paciente"] = resp.id;
    //         this.caseDataService
    //           .addCase(newCase)
    //           .then((resp) => {
    //             this.resetForms();
    //             this.toastrService.show(
    //               "Caso y usuario registrados correctamente",
    //               "Éxito",
    //               {
    //                 destroyByClick: true,
    //                 preventDuplicates: true,
    //                 status: "success",
    //                 icon: "checkmark",
    //                 // iconPack: "eva",
    //               }
    //             );
    //           })
    //           .catch((error) => {
    //             this.toastrService.show(
    //               "El caso no pudo ser creado, verifique los datos ingresados e intente nuevamente",
    //               "Error",
    //               {
    //                 destroyByClick: true,
    //                 preventDuplicates: true,
    //                 status: "danger",
    //                 icon: "alert-triangle",
    //                 // iconPack: "eva",
    //               }
    //             );
    //             console.log(error);
    //           });
    //       })
    //       .catch((error) => {
    //         this.toastrService.show(
    //           "El usuario no pudo ser creado, verifique los datos ingresados e intente nuevamente",
    //           "Error",
    //           {
    //             destroyByClick: true,
    //             preventDuplicates: true,
    //             status: "danger",
    //             icon: "alert-triangle",
    //             // iconPack: "eva",
    //           }
    //         );
    //         console.log(error);
    //       });
    //   }
    // } else {
    //   this.caseDataService
    //     .addCase(newCase)
    //     .then((resp) => {
    //       this.resetForms();
    //       this.toastrService.show("Caso registrado correctamente", "Éxito", {
    //         destroyByClick: true,
    //         preventDuplicates: true,
    //         status: "success",
    //         icon: "checkmark",
    //         // iconPack: "eva",
    //       });
    //     })
    //     .catch((error) => {
    //       this.toastrService.show(
    //         "El caso no pudo ser creado, verifique los datos ingresados e intente nuevamente",
    //         "Error",
    //         {
    //           destroyByClick: true,
    //           preventDuplicates: true,
    //           status: "danger",
    //           icon: "alert-triangle",
    //           // iconPack: "eva",
    //         }
    //       );
    //       console.log(error);
    //     });
    // }
  }

  validatePaciente(option: any) {
    if (option.selected) {
      this.nuevoPaciente = true;
    } else {
      this.nuevoPaciente = false;
    }
  }

  counter(narrativa: any, current: any, counter: any) {
    if (narrativa.value.length >= 7500) {
      counter.style.color = "red";
    } else {
      counter.style.color = "black";
    }
    current.innerHTML = Intl.NumberFormat("de-DE").format(
      narrativa.value.length
    );
  }

  counter2(observaciones: any, current: any, counter: any) {
    if (observaciones.value.length >= 3500) {
      counter.style.color = "red";
    } else {
      counter.style.color = "black";
    }
    current.innerHTML = Intl.NumberFormat("de-DE").format(
      observaciones.value.length
    );
  }

  resetForms() {
    this.router
      .navigateByUrl("/anuncios", { skipLocationChange: true })
      .then(() => this.router.navigate(["/caso/crear"]));
  }

  redirect(link: string) {
    window.open(
      link,
      "popUpWindow",
      "height=600,width=992,left=10,top=10,,scrollbars=yes,menubar=no"
    );
  }
}
