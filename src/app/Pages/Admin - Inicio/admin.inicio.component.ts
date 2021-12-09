import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { AnuncioDataService } from "../../anuncio.data.service";
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: "app-inicio",
  templateUrl: "./admin.inicio.component.html",
  styleUrls: ["./admin.inicio.component.css"]
})
export class AdminInicioComponent implements OnInit {
  @ViewChild("anuncioForm") anuncioForm: NgForm;
  anuncios: Observable<any[]>;
  modalOpen: any;
  editable: false;
  constructor(
    private anuncioDataService: AnuncioDataService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.anuncios = this.anuncioDataService.getAnuncios();
  }

  addAnuncio(anuncioForm: NgForm) {
    let newAnuncio = anuncioForm.value;
    newAnuncio["fecha"] = this.getDate(new Date());
    this.anuncioDataService
      .addAnuncio(newAnuncio)
      .then(resp => {
        this.modalOpen.close();
        this.toastrService.show("Anuncio creado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          iconPack: "eva"
        });
      })
      .catch(error => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva"
        });
      });
  }

  updateAnuncio(anuncioForm: NgForm) {
    let anuncio = anuncioForm.value;
    anuncio["fecha"] = this.getDate(new Date());
    this.anuncioDataService
      .updateAnuncio(anuncio)
      .then(resp => {
        this.modalOpen.close();
        this.toastrService.show("Anuncio actualizado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          iconPack: "eva"
        });
      })
      .catch(error => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva"
        });
      });
  }

  deleteAnuncio(anuncioForm: NgForm) {
    this.anuncioDataService
      .deleteAnuncio(anuncioForm.value.id)
      .then(resp => {
        this.modalOpen.close();
        this.toastrService.show("Anuncio eliminado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          iconPack: "eva"
        });
      })
      .catch(error => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva"
        });
      });
  }

  loadAnuncio(id: string) {
    this.anuncioDataService.getAnuncioById(id).subscribe( resp => {
      this.anuncioForm.setValue({
        id: id,
        titulo: resp["titulo"],
        contenido: resp["contenido"]
      });
    })
  }

  openDialog(dialog: TemplateRef<any>, id: string) {
    this.modalOpen = this.dialogService.open(dialog);
    if (id) {
      this.loadAnuncio(id);
    }
  }

  getDate(date: Date) {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }
}
