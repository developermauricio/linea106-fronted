import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { AnuncioModel } from 'src/app/Models/anuncio.model';
import { AnuncioService } from 'src/app/Services/Admin/anuncio.service';

@Component({
  selector: "app-inicio",
  templateUrl: "./admin.inicio.component.html",
  styleUrls: ["./admin.inicio.component.css"]
})
export class AdminInicioComponent implements OnInit {
  @ViewChild("anuncioForm") anuncioForm: NgForm;
  anuncios: AnuncioModel[];
  modalOpen: any;
  editable: false;

  currentId: number;

  constructor(
    private _anuncioService: AnuncioService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.loadAnuncios();
  }

  private loadAnuncios() {
    this._anuncioService.getAll().subscribe(anuncios => {
      this.anuncios = anuncios;
    });
  }

  addAnuncio(anuncioForm: NgForm) {
    let newAnuncio = anuncioForm.value;
    this._anuncioService
      .store(newAnuncio).subscribe(resp => {
        this.modalOpen.close();
        this.toastrService.show("Anuncio creado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          // iconPack: "eva"
        });
        this.anuncios.unshift(resp);
      }, error => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          // iconPack: "eva"
        });
      });
  }

  updateAnuncio(anuncioForm: NgForm) {
    let anuncio = anuncioForm.value;
    this._anuncioService
      .update(this.currentId, anuncio).subscribe(resp => {
        this.modalOpen.close();
        this.toastrService.show("Anuncio actualizado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          // iconPack: "eva"
        });
        this.anuncios.splice(this.anuncios.findIndex(r => r.id == this.currentId), 1, resp);
      }, error => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          // iconPack: "eva"
        });
      });
  }

  deleteAnuncio() {
    this._anuncioService
      .delete(this.currentId)
      .subscribe(() => {
        this.modalOpen.close();
        this.toastrService.show("Anuncio eliminado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          // iconPack: "eva"
        });
        this.anuncios.splice(this.anuncios.findIndex(r => r.id == this.currentId), 1);
      }, error => {
        this.toastrService.show(error.message, "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          // iconPack: "eva"
        });
      });
  }

  loadAnuncio(id: number) {
    this._anuncioService.getById(id).subscribe(resp => {
      this.anuncioForm.setValue({
        id: id,
        title: resp.title,
        description: resp.description
      });
    });
  }

  openDialog(dialog: TemplateRef<any>, id: number) {
    this.modalOpen = this.dialogService.open(dialog);
    if (id) {
      this.currentId = Number(id);
      this.loadAnuncio(this.currentId);
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
