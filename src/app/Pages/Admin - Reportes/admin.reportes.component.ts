import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CaseDataService } from "../../case.data.service";
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Observable } from "rxjs";
import { NgForm } from '@angular/forms';
import { PatientDataService } from '../../patient.data.service';

@Component({
  selector: "app-admin.reportes",
  templateUrl: "./admin.reportes.component.html",
  styleUrls: ["./admin.reportes.component.css"]
})
export class AdminReportesComponent implements OnInit {
  @ViewChild("casoForm") caseForm: NgForm;
  @ViewChild("pacienteForm") patientForm: NgForm;
  casos: Observable<any[]>;
  casosOrderByPsicologo: Observable<any[]>;
  term = "";
  modalOpenCase: any;
  modalOpenPatient: any;

  constructor(
    private patientDataService: PatientDataService,
    private caseDataService: CaseDataService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.casos = this.caseDataService.getCasesRemision();
    this.casosOrderByPsicologo = this.caseDataService.getCasesOrderByPsicologo();
  }

  loadCase(id: string) {
    this.caseDataService.getCaseById(id).subscribe(result => {
      let quienComunica = "---";
      let nombreLlama = "---";
      let paciente = "---";
      let remision = "---";
      let respuesta = "---";
      let radicado = "---";
      let cual_servicio_social = "---";
      let cual_no_fomulado = "---";
      if (result["quien_comunica"]) quienComunica = result["quien_comunica"];
      if (result["nombre_llama"]) nombreLlama = result["nombre_llama"];
      if (result["paciente"]) paciente = result["paciente"];
      if (result["remision"]) remision = result["remision"];
      if (result["respuesta"]) respuesta = result["respuesta"];
      if (result["radicado"]) radicado = result["radicado"];
      if (result["cual_servicio_social"])
        cual_servicio_social = result["cual_servicio_social"];
      if (result["cual_no_fomulado"])
        cual_no_fomulado = result["cual_no_fomulado"];
      let date = new Date(result["fecha_inicio"]);
      let dateFin = new Date(result["fecha_fin"]);
      let dateUlt = new Date(result["ultima_actualizacion"]);
      this.caseForm.setValue({
        id: id,
        fecha_inicio: (
          date.getFullYear() +
          " - " +
          (date.getMonth() + 1) +
          " - " +
          date.getDate() +
          " " +
          date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        ),
        fecha_fin: (
          dateFin.getFullYear() +
          " - " +
          (dateFin.getMonth() + 1) +
          " - " +
          dateFin.getDate() +
          " " +
          dateFin.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        ),
        ultima_actualizacion: (
          dateUlt.getFullYear() +
          " - " +
          (dateUlt.getMonth() + 1) +
          " - " +
          dateUlt.getDate() +
          " " +
          dateUlt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        ),
        psicologo: result["psicologo"],
        quien_comunica: quienComunica,
        nombre_llama: nombreLlama,
        tipo_paciente: result["tipo_paciente"],
        paciente: paciente,
        origen: result["origen"],
        fuente: result["fuente"],
        motivoConsulta: result["motivoConsulta"],
        linea_intervencion: result["linea_intervencion"],
        remision: remision,
        respuesta: respuesta,
        cual_servicio_social: cual_servicio_social,
        cual_no_fomulado: cual_no_fomulado,
        radicado: radicado,
        narrativa: result["narrativa"],
        observaciones: result["observaciones"]
      });
    });
  }

  loadPaciente(id: string) {
    this.patientDataService.getPatientById(id).subscribe(result => {
      if (result) {
        let vereda = "---";
        let id = "---";
        let escolaridad = "---";
        let ocupacion = "---";
        let estado_civil = "---";
        if (result["vereda"]) vereda = result["vereda"];
        if (result["id"]) id = result["id"];
        if (result["escolaridad"]) escolaridad = result["escolaridad"];
        if (result["ocupacion"]) ocupacion = result["ocupacion"];
        if (result["estado_civil"]) estado_civil = result["estado_civil"];
        this.patientForm.setValue({
          tipo_id: result["tipo_id"],
          nombre: result["nombre"],
          sexo: result["sexo"],
          edad: result["edad"],
          vereda: vereda,
          id: id,
          escolaridad: escolaridad,
          ocupacion: ocupacion,
          estado_civil: estado_civil,
          apellido: result["apellido"],
          genero: result["genero"],
          municipio: result["municipio"],
          direccion: result["direccion"],
          como_conocio: result["como_conocio"],
          fecha_nacimiento: result["fecha_nacimiento"],
          orientacion_sexual: result["orientacion_sexual"],
          zona: result["zona"],
          poblacion_interes: result["poblacion_interes"]
        });
      } else {
        this.modalOpenPatient.close();
        this.toastrService.show(
          "El usuario solicitado no ha sido registrado en el sistema",
          "Error",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "danger",
            icon: "alert-triangle",
            iconPack: "eva"
          }
        );
      }
    });
  }

  openDialog(tipo: string, dialog: TemplateRef<any>, id: string) {
    if (tipo === "caso") {
      this.modalOpenCase = this.dialogService.open(dialog);
      this.loadCase(id);
    } else if (tipo === "paciente") {
      this.modalOpenPatient = this.dialogService.open(dialog);
      this.loadPaciente(id);
    } else {
      console.log("Error: El dialogo a abrir no se reconoce");
    }
  }
}
