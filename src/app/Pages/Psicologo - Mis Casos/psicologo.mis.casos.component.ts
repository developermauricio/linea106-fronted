import { DashboardComponent } from "src/app/Dashboard/dashboard.component";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { PatientDataService } from "../../patient.data.service";
import { CaseDataService } from "src/app/case.data.service";
import { UserDataService } from "src/app/user.data.service";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { NgForm } from "@angular/forms";
import { SeguimientoDataService } from "../../seguimiento.data.service";

@Component({
  selector: "app-psicologo.mis.casos",
  templateUrl: "./psicologo.mis.casos.component.html",
  styleUrls: ["./psicologo.mis.casos.component.css"],
})
export class PsicologoMisCasosComponent implements OnInit {
  @ViewChild("casoForm") caseForm: NgForm;
  @ViewChild("casoDataForm") caseDataForm: NgForm;
  @ViewChild("pacienteForm") patientForm: NgForm;
  @ViewChild("seguimientoForm") seguimientoForm: NgForm;
  total;
  source;

  psicologoId: string;
  modalOpenCase: any;
  modalOpenPatient: any;
  modalOpenDataCase: any;
  modalOpenSeguimiento: any;

  casoAbiertoId: string;

  constructor(
    private seguimientoDataService: SeguimientoDataService,
    private dashboardComponent: DashboardComponent,
    private patientDataService: PatientDataService,
    private caseDataService: CaseDataService,
    private userDataService: UserDataService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.psicologoId = null;
    this.caseDataService
      .getCaseByPsicologo(this.psicologoId)
      .subscribe((resp) => {
        this.source = resp;
        this.total = (resp.length + "").replace(
          /(\d)(?=(\d{3})+(?!\d))/g,
          "$1."
        );
      });
  }

  settings = {
    pager: {
      perPage: 50,
    },
    noDataMessage: "No se hallaron registros, intenta nuevamente.",
    columns: {
      psicologo: {
        title: "Psicólogo",
        type: "string",
      },
      motivoConsulta: {
        title: "Motivo",
        type: "string",
      },
      origen: {
        title: "Origen",
        type: "string",
      },
      fuente: {
        title: "Fuente",
        type: "string",
      },
      paciente: {
        title: "Usuario",
        type: "string",
      },
      fecha_inicio: {
        title: "Fecha",
        type: "date",
        valuePrepareFunction: (date: number) => this.convertTimestamp(date),
        filterFunction: (date: number, search: string): boolean => {
          const match = this.convertTimestamp(date).indexOf(search) > -1;
          if (match || search === "") return true;
          else return false;
        },
      },
      linea_intervencion: {
        title: "Intervención",
        type: "string",
      },
    },
    actions: {
      edit: false,
      delete: false,
      add: false,
      columnTitle: "Ver",
      custom: [
        {
          name: "view",
          title:
            '<div class="text-center" style="cursor:pointer"><i class="material-icons">&#xE417;</i></div>',
        },
      ],
      position: "right",
    },
    rowClassFunction: (row: any) => {
      if (row.data.respuesta == "Oficio enviado") return "enviado";
      if (row.data.respuesta == "Oficio recibido") return "recibido";
      if (row.data.respuesta == "Respuesta de la entidad") return "respuesta";
      if (row.data.respuesta == "Caso cerrado") return "cerrado";
    },
  };

  convertTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    if (date)
      return (
        date.toISOString().replace(/-/g, "/").replace("T", " ").substr(0, 10) +
        " " +
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    return "Fecha inválida";
  }

  loadCase(id: string) {
    this.caseDataService.getCaseById(id).subscribe((result) => {
      let paciente = "---";
      if (result["paciente"]) paciente = result["paciente"];
      this.caseForm.setValue({
        id: id,
        paciente: paciente,
        narrativa: result["narrativa"],
        observaciones: result["observaciones"],
      });
    });
  }

  loadDataCase(id: string) {
    this.caseDataService.getCaseById(id).subscribe((result) => {
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
      this.caseDataForm.setValue({
        id: id,
        fecha_inicio:
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate() +
          " " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        fecha_fin:
          dateFin.getFullYear() +
          "/" +
          (dateFin.getMonth() + 1) +
          "/" +
          dateFin.getDate() +
          " " +
          dateFin.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        ultima_actualizacion:
          dateUlt.getFullYear() +
          "/" +
          (dateUlt.getMonth() + 1) +
          "/" +
          dateUlt.getDate() +
          " " +
          dateUlt.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
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
      });
    });
  }

  loadPaciente(id: string) {
    this.patientDataService.getPatientById(id).subscribe((result) => {
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
          poblacion_interes: result["poblacion_interes"],
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
            iconPack: "eva",
          }
        );
      }
    });
  }

  openDialog(tipo: string, dialog: TemplateRef<any>, id: string) {
    this.casoAbiertoId = id;
    if (tipo === "caso") {
      this.modalOpenCase = this.dialogService.open(dialog);
      this.loadCase(id);
    } else if (tipo === "paciente") {
      this.modalOpenPatient = this.dialogService.open(dialog);
      this.loadPaciente(id);
    } else if (tipo == "seguimiento") {
      this.modalOpenSeguimiento = this.dialogService.open(dialog);
      this.loadSeguimiento(id);
    } else if (tipo == "datosCaso") {
      this.modalOpenDataCase = this.dialogService.open(dialog);
      this.loadDataCase(id);
    } else {
      console.log("Error: El dialogo a abrir no se reconoce");
    }
  }

  loadSeguimiento(id: string) {
    setTimeout(() => {
      this.seguimientoForm.setValue({
        id_caso: id,
        seguimiento: "",
      });
    }, 100);
  }

  deleteCase(id: string) {
    this.caseDataService
      .deleteCase(id)
      .then((resp) => {
        this.toastrService.show("Caso eliminado correctamente", "Éxito", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          iconPack: "eva",
        });
      })
      .catch((err) => {
        this.toastrService.show("El caso no pudo ser eliminado", "Error", {
          destroyByClick: true,
          preventDuplicates: true,
          status: "danger",
          icon: "alert-triangle",
          iconPack: "eva",
        });
      });
  }

  addSeguimiento(seguimientoForm: NgForm) {
    let seguimiento = seguimientoForm.value;
    seguimiento["psicologo"] = this.psicologoId;
    seguimiento["fecha"] = this.getDate(new Date());
    this.seguimientoDataService
      .addSeguimiento(seguimiento)
      .then((resp) => {
        this.modalOpenSeguimiento.close();
        this.toastrService.show(
          "Seguimiento registrado correctamente",
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
        this.modalOpenSeguimiento.close();
        this.toastrService.show(
          "El seguimiento no pudo ser agregado, verifique los datos ingresados e intente nuevamente",
          "Error",
          {
            destroyByClick: true,
            preventDuplicates: true,
            status: "danger",
            icon: "alert-triangle",
            iconPack: "eva",
          }
        );
        console.log(error);
      });
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
