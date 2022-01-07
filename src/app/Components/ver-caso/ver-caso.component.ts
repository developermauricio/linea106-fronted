import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subject, Subscription } from 'rxjs';
import { CasoModel } from 'src/app/Models/caso.model';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { TipoModel } from 'src/app/Models/tipo.model';
import { UserModel } from 'src/app/Models/user.model';
import { PatientDataService } from 'src/app/patient.data.service';
import { SeguimientoDataService } from 'src/app/seguimiento.data.service';
import { CasoService } from 'src/app/Services/Psicologo/caso.service';

@Component({
  selector: 'app-ver-caso',
  templateUrl: './ver-caso.component.html',
  styleUrls: ['./ver-caso.component.scss']
})
export class VerCasoComponent implements OnInit, OnDestroy {

  @ViewChild('verCaso') verCaso;
  @ViewChild('seguimientoForm') seguimientoForm;

  @Input() showCase: Subject<CasoModel>;

  id = null;
  caso: CasoModel;

  modalOpenCase: any;
  modalOpenPatient: any;
  modalOpenDataCase: any;
  modalOpenSeguimiento: any;

  subscribe: Subscription = null;

  constructor(
    private seguimientoDataService: SeguimientoDataService,
    private patientDataService: PatientDataService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private _casoService: CasoService
  ) { }

  ngOnInit() {
    this.subscribe = this.showCase.subscribe(caso => {
      this.caso = caso;
      this.id = caso.id;

      this.openDialog('caso', this.verCaso, caso.id);
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  openDialog(tipo: string, dialog: TemplateRef<any>, id: number) {
    this.loadDataCase(this.caso.id);
    if (tipo === "caso") {
      this.modalOpenCase = this.dialogService.open(dialog);

    } else if (tipo === "paciente") {
      this.modalOpenPatient = this.dialogService.open(dialog);
    } else if (tipo == "seguimiento") {
      this.modalOpenSeguimiento = this.dialogService.open(dialog);
    } else if (tipo == "datosCaso") {
      this.modalOpenDataCase = this.dialogService.open(dialog);
    } else {
      console.log("Error: El dialogo a abrir no se reconoce");
    }
  }

  loadDataCase(id: number) {
    this._casoService.getById(id).subscribe((caso) => {
      this.caso = caso;
    });
  }



  loadSeguimiento() {
    setTimeout(() => {
      this.seguimientoForm.setValue({
        id_caso: this.caso.id,
        seguimiento: "",
      });
    }, 100);
  }

  addSeguimiento(seguimientoForm: NgForm) {
    let seguimiento = seguimientoForm.value;
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

  private getDate(date: Date) {
    return date.toISOString();
  }

  get case_id() {
    return this.caso.id;
  }

  get case_narrativa() {
    return this.caso.narrativa || '---';
  }

  get case_observaciones() {
    return this.caso.observaciones || '---';
  }

  get case_fecha_inicio() {
    return this.caso.fecha_inicio;
  }

  get case_fecha_fin() {
    return this.caso.fecha_fin;
  }

  get case_updated_at() {
    return this.caso.updated_at;
  }

  get case_quien_comunica() {
    return this.getNameTipo(this.caso.quien_comunica);
  }

  get case_nombre_llama() {
    return this.caso.nombre_llama || '---';
  }

  get case_tipo_paciente() {
    return this.getNameTipo(this.caso.tipo_paciente);
  }

  get case_origen() {
    return this.getNameTipo(this.caso.origen);
  }

  get case_motivo_consulta() {
    return this.getNameTipo(this.caso.motivo_consulta);
  }

  get case_linea_intervencion() {
    return this.getNameTipo(this.caso.linea_intervencion);
  }

  get case_remision() {
    return this.getNameTipo(this.caso.remision);
  }

  get case_respuesta() {
    return this.getNameTipo(this.caso.respuesta);
  }

  get case_radicado() {
    return this.getNameTipo(this.caso.radicado);
  }

  get case_fuente() {
    return this.caso.fuente || '---';
  }

  get case_usuario() {
    return this.getNameUser(this.caso.usuario);
  }

  get paciente(): PacienteModel {
    return this.caso.paciente || JSON.parse('{}');
  }

  get paciente_full_nombre() {
    return this.getNamePaciente(this.paciente);
  }

  get paciente_nombre() {
    return this.paciente.nombre || '---';
  }

  get paciente_tipo_identificacion() {
    return this.getNameTipo(this.paciente.tipo_identificacion);
  }

  get paciente_sexo() {
    return this.getNameTipo(this.paciente.sexo);
  }

  get paciente_edad() {
    return this.paciente.edad || '---';
  }

  get paciente_vereda() {
    return this.getNameTipo(this.paciente.vereda);
  }

  get paciente_nivel_educacion() {
    return this.getNameTipo(this.paciente.nivel_educacion);
  }

  get paciente_numero_identificacion() {
    return this.paciente.identificacion || '---';
  }

  get paciente_apellido() {
    return this.paciente.apellido || '---';
  }

  get paciente_genero() {
    return this.getNameTipo(this.paciente.genero);
  }

  get paciente_municipio() {
    return this.getNameTipo(this.paciente.municipio);
  }

  get paciente_ocupacion() {
    return this.getNameTipo(this.paciente.ocupacion);
  }

  get paciente_como_conocio() {
    return this.getNameTipo(this.paciente.como_conocio);
  }

  get paciente_orientacion_sexual() {
    return this.getNameTipo(this.paciente.orientacion_sexual);
  }

  get paciente_zona() {
    return this.getNameTipo(this.paciente.zona);
  }

  get paciente_poblacion_interes() {
    return this.getNameTipo(this.paciente.poblacion_interes);
  }

  get paciente_estado_civil() {
    return this.getNameTipo(this.paciente.estado_civil);
  }

  get paciente_direccion() {
    return this.paciente.direccion || '---';
  }

  get paciente_fecha_nacimiento() {
    return this.paciente.fecha_nacimiento || '---';
  }


  private getNameTipo(tipo: TipoModel): string {
    if (!tipo) {
      return '---';
    }
    return tipo.name || '---';
  }

  private getNameUser(user: UserModel) {
    if (!user) {
      return '---';
    }

    return `${user.name || ''} ${user.last_name || ''}`.trim() || '---';
  }

  private getNamePaciente(paciente: PacienteModel) {
    if (!paciente) {
      return '---';
    }

    return `${paciente.nombre || ''} ${paciente.apellido || ''}`.trim() || '---';
  }

}
