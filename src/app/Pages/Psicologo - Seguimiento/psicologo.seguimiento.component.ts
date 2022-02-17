import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-seguimiento",
  templateUrl: "./psicologo.seguimiento.component.html",
  styleUrls: ["./psicologo.seguimiento.component.css"]
})
export class PsicologoSeguimientoComponent implements OnInit {
  @ViewChild("seguimientoForm") seguimientoForm: NgForm;
  seguimientos: Observable<any[]>;

  term = "";

  modelOpened: any;
  constructor(
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    // this.seguimientos = this.seguimientoDataService.getSeguimientos();
  }

  openDialog(dialog: TemplateRef<any>, id: string) {
    this.modelOpened = this.dialogService.open(dialog);
    this.loadSeguimiento(id);
  }

  loadSeguimiento(id: string) {
    // this.seguimientoDataService.getSeguimientoById(id).subscribe(resp => {
    //   let id_caso;
    //   if (resp["id_caso"]) id_caso = resp["id_caso"];
    //   else id_caso = "---";
    //   let date = resp["fecha"];
    //   this.seguimientoForm.setValue({
    //     id: id,
    //     id_caso: id_caso,
    //     seguimiento: resp["seguimiento"],
    //     psicologo: resp["psicologo"],
    //     fecha: (
    //       date.getFullYear() +
    //       "-" +
    //       (date.getMonth() + 1) +
    //       "-" +
    //       date.getDate() +
    //       " " +
    //       date.getHours() +
    //       ":" +
    //       date.getMinutes() +
    //       ":" +
    //       date.getSeconds()
    //     )
    //   });
    // });
  }
}
