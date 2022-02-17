import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DataCaseModel } from '../../models/data-case.model';
import { DataPacienteModel } from '../../models/data-paciente.model';
import { CasoService } from '../../services/caso.service';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-crear-caso',
  templateUrl: './crear-caso.component.html',
  styleUrls: ['./crear-caso.component.css']
})
export class CrearCasoComponent implements OnInit {

  public formGroupCase: FormGroup;
  public formGroupPaciente: FormGroup;

  public dataCase: DataCaseModel = {
    etnicidades: [],
    lineaIntervenciones: [],
    motivosConsultas: [],
    origenes: [],
    quienComunica: [],
    radicados: [],
    relaciones: [],
    remisiones: [],
    respuestas: [],
    tipoPacientes: [],
    turnos: [],
    motivosConsultaEspecificos: []
  };

  public dataPaciente: DataPacienteModel = {
    como_conocio: [],
    departamentos: [],
    estado_civiles: [],
    etnias: [],
    generos: [],
    niveles_educacion: [],
    ocupaciones: [],
    orientaciones_sexuales: [],
    sexos: [],
    tipos_identificacion: [],
    zonas: [],
    poblacion_intereses: []
  };

  constructor(
    private _casoService: CasoService,
    private _pacienteService: PacienteService,
    private _toastrService: NbToastrService
  ) { }

  ngOnInit() {
    this._casoService.getOptionsCase().subscribe(dataCase => {
      this.dataCase = dataCase;
    });
    this._pacienteService.getDataPaciente().subscribe(dataPaciente => {
      this.dataPaciente = dataPaciente;
    });
  }

  get hasErrorCase() {
    if (!this.formGroupCase) {
      return false;
    }
    return this.formGroupCase.invalid;
  }

  get hasErrorPerson() {
    if (!this.formGroupPaciente) {
      return false;
    }
    return this.formGroupPaciente.invalid;
  }

  get hasErrors() {
    return this.hasErrorCase || this.hasErrorPerson;
  }

  get is_update() {
    return this.formGroupCase.get('id').value || false;
  }

  get btnName() {
    return this.is_update ? 'Actualizar' : 'Crear';
  }

  public setFormGroupCase(form: FormGroup) {
    this.formGroupCase = form;
  }

  public setFormGroupPaciente(form: FormGroup) {
    this.formGroupPaciente = form;
  }

  public resetForms() {
    if (this.formGroupCase) {
      this.formGroupCase.reset();
    }
    if (this.formGroupPaciente) {
      this.formGroupPaciente.reset();
      this.formGroupPaciente.patchValue({
        'identificacion': null,
      });
    }
  }


  public createCase() {
    this._casoService.createOrUpdateCase(
      this.formGroupCase.value,
      this.formGroupPaciente.value
    ).subscribe(resp => {
      this._toastrService.show(
        "Caso " + (this.is_update ? 'Actualizado' : 'Creado'),
        "Éxito",
        {
          destroyByClick: true,
          preventDuplicates: true,
          status: "success",
          icon: "checkmark",
          // iconPack: "eva",
        }
      );

      if (!resp.paciente.identificacion) {
        resp.paciente.identificacion = '';
      }

      this.formGroupCase.patchValue(resp.caso);
      this.formGroupPaciente.patchValue(resp.paciente);
    }, err => {
      console.error(err);
    });
  }

  public redirect(link: string) {
    window.open(
      link,
      "popUpWindow",
      "height=600,width=992,left=10,top=10,,scrollbars=yes,menubar=no"
    );
  }

}
