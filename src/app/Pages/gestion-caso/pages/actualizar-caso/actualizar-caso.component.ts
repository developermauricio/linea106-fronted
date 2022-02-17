import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { CasoModel } from 'src/app/Models/caso.model';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { DataCaseModel } from '../../models/data-case.model';
import { DataPacienteModel } from '../../models/data-paciente.model';
import { CasoService } from '../../services/caso.service';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-actualizar-caso',
  templateUrl: './actualizar-caso.component.html',
  styleUrls: ['./actualizar-caso.component.css']
})
export class ActualizarCasoComponent implements OnInit {

  public formGroupCase: FormGroup;
  public formGroupPaciente: FormGroup;

  setPaciente: Subject<PacienteModel> = new Subject();
  setCaso: Subject<CasoModel> = new Subject();

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
    private _toastrService: NbToastrService,
    private _activateRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this._casoService.getOptionsCase().subscribe(dataCase => {
      this.dataCase = dataCase;
    });
    this._pacienteService.getDataPaciente().subscribe(dataPaciente => {
      this.dataPaciente = dataPaciente;
    });
    this._activateRoute.params.subscribe(param => {
      if (param.id) {
        this._casoService.getById(param.id).subscribe(resp => {
          this.setPaciente.next(resp.paciente);
          this.setCaso.next(resp);
        }, err => {
          console.error(err);
        });
      }
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
      this.setPaciente.next({
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
      if (resp.paciente.identificacion) {
        resp.paciente.identificacion = '';
      }
      this.setCaso.next(resp.caso);
      this.setPaciente.next(resp.paciente);
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

  cancelar() {
    this._location.back();
  }
}
