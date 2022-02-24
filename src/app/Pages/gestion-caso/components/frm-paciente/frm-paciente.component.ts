import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { TipoModel } from 'src/app/Models/tipo.model';
import { DataPacienteModel } from '../../models/data-paciente.model';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-frm-paciente',
  templateUrl: './frm-paciente.component.html',
  styleUrls: ['./frm-paciente.component.css']
})
export class FrmPacienteComponent implements OnInit {


  @Input() dataPaciente: DataPacienteModel;

  public callbackFilterMunicipio: Function;
  public callbackFilterVereda: Function;

  buscar = false;

  currentDay: string;

  municipios: TipoModel[] = [];
  veredas: TipoModel[] = [];

  paciente: PacienteModel = {
    identificacion: null
  };

  formGroupPaciente: FormGroup;
  @Output() setFormGroupPaciente: EventEmitter<FormGroup> = new EventEmitter();

  @Input() setPaciente: Subject<PacienteModel> = null;
  private subscriber: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _locationService: LocationService
  ) { }

  ngOnInit() {
    this.currentDay = this.getDateInput(new Date());
    this.callbackFilterMunicipio = this.filterMunicipio.bind(this);
    this.callbackFilterVereda = this.filterVereda.bind(this);
    this.formGroupPaciente = this._formBuilder.group({
      id: [null],
      identificacion: [null],
      nombre: [null],
      apellido: [null],
      sisben: [null],
      edad: [null],
      direccion: [null],
      fecha_nacimiento: [null],
      como_conocio: [null],
      como_conocio_descripcion: [null],
      orientacion_sexual: [null],
      genero: [null],
      sexo: [null],
      etnia: [null],
      estado_civil: [null],
      ocupacion: [null],
      nivel_educacion: [null],
      zona: [null],
      tipo_identificacion: [null],
      poblacion_interes: [null],
      municipio: [null],
      departamento: [null],
      vereda: [null]
    });
    this.setFormGroupPaciente.emit(this.formGroupPaciente);

    if (this.setPaciente) {
      this.subscriber = this.setPaciente.subscribe(paciente => {
        if (paciente.id && !paciente.identificacion) {
          paciente.identificacion = '';
        }
        console.log(paciente);
        this.formGroupPaciente.patchValue(paciente);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  get hasIdentification() {
    return this.formGroupPaciente.get('identificacion').value !== null;
  }

  get orientaciones_sexuales() {
    return this.dataPaciente.orientaciones_sexuales;
  }

  get generos() {
    return this.dataPaciente.generos;
  }

  get sexos() {
    return this.dataPaciente.sexos;
  }

  get etnias() {
    return this.dataPaciente.etnias;
  }

  get estado_civiles() {
    return this.dataPaciente.estado_civiles;
  }

  get ocupaciones() {
    return this.dataPaciente.ocupaciones;
  }

  get niveles_educacion() {
    return this.dataPaciente.niveles_educacion;
  }

  get zonas() {
    return this.dataPaciente.zonas;
  }

  get tipos_identificacion() {
    return this.dataPaciente.tipos_identificacion;
  }

  get poblacion_intereses() {
    return this.dataPaciente.poblacion_intereses;
  }

  get departamentos() {
    return this.dataPaciente.departamentos;
  }

  get como_conocio() {
    return this.dataPaciente.como_conocio;
  }

  get is_rural() {
    const zone: TipoModel = this.formGroupPaciente.get('zona').value;
    if (zone && zone.name) {
      return zone.name.toLocaleLowerCase().includes('rural');
    }
    return false;
  }

  get hasDepartamento() {
    const dep: TipoModel = this.formGroupPaciente.get('departamento').value;
    if (dep && dep.name) {
      return true;
    }
    return false;
  }

  get hasMunicipio() {
    const mun: TipoModel = this.formGroupPaciente.get('municipio').value;
    if (mun && mun.name) {
      return true;
    }
    return false;
  }

  buscarUsuario() {
    this.formGroupPaciente.patchValue({
      'identificacion': null,
    });
    this.buscar = true;
  }

  compare(item: TipoModel, item2: TipoModel) {
    if (item && item2) {
      return item.id === item2.id;
    }
    return item === item2;
  }

  cancelarBusquedaUsuario() {
    this.formGroupPaciente.patchValue({
      'identificacion': null,
    });
    this.buscar = false;
  }

  nuevoUsuario() {
    this.cancelarBusquedaUsuario();
    this.formGroupPaciente.reset();
    Object.assign(this.paciente, this.formGroupPaciente.value);
    this.formGroupPaciente.patchValue({
      'identificacion': '',
    });
  }

  selectPaciente(paciente: PacienteModel) {
    Object.assign(this.paciente, paciente);
    this.formGroupPaciente.patchValue(paciente);
    if (!paciente.identificacion) {
      this.formGroupPaciente.patchValue({
        'identificacion': '',
      });
    }
    this.buscar = false;
  }

  getTitleDepartamento(item: TipoModel) {
    return item.name;
  }

  getTitleMunicipio(item: TipoModel) {
    return item.name;
  }

  getTitleVereda(item: TipoModel) {
    return item.name;
  }

  get departamento() {
    const item = this.formGroupPaciente.get('departamento').value;
    if (item && item.id) {
      return item;
    }
    return null;
  }

  get departamentoId() {
    return this.departamento ? this.departamento.id : 0;
  }

  get municipio() {
    const item = this.formGroupPaciente.get('municipio').value;
    if (item && item.id) {
      return item;
    }
    return null;
  }

  get municipioId() {
    return this.municipio ? this.municipio.id : 0;
  }

  filterMunicipio(searchTerm: string) {
    return new Promise((resolve, reject) => {
      if (!searchTerm?.trim()) {
        resolve(this.municipios);
      } else {
        this._locationService.municipioByDepartamento(this.departamentoId, searchTerm)
          .subscribe(resp => {
            resolve(resp);
          }, err => {
            reject(err);
            console.error(err);
          });
      }
    });
  };

  filterVereda(searchTerm: string) {
    return new Promise((resolve, reject) => {
      if (!searchTerm?.trim()) {
        resolve(this.municipios);
      } else {
        this._locationService.veredaByMunicipio(this.municipioId, searchTerm)
          .subscribe(resp => {
            resolve(resp);
          }, err => {
            reject(err);
            console.error(err);
          });
      }
    });
  };

  prevent(e) {
    e.preventDefault();
  }


  private getFullNumber(numero: number) {
    if (numero < 10) {
      return '0' + numero;
    }
    return numero;
  }

  private getDateInput(date: Date) {
    return `${date.getFullYear()}-${this.getFullNumber(date.getMonth() + 1)}-${this.getFullNumber(date.getDate())}`;
  }
}
