import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CasoModel } from 'src/app/Models/caso.model';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { TipoModel } from 'src/app/Models/tipo.model';
import { DataCaseModel } from '../../models/data-case.model';
import { DataPacienteModel } from '../../models/data-paciente.model';

@Component({
  selector: 'app-frm-caso',
  templateUrl: './frm-caso.component.html',
  styleUrls: ['./frm-caso.component.css']
})
export class FrmCasoComponent implements OnInit, OnDestroy {

  formGroupCase: FormGroup;

  @Input() dataCase: DataCaseModel;
  @Input() dataPaciente: DataPacienteModel;

  @Input() setCaso: Subject<CasoModel> = null;
  @Input() setPaciente: Subject<PacienteModel> = null;

  @Output() setFormGroupCase: EventEmitter<FormGroup> = new EventEmitter();
  @Output() setFormGroupPaciente: EventEmitter<FormGroup> = new EventEmitter();

  motivoConsulta: TipoModel = null;
  quienComunica: TipoModel = null;
  lineaIntervencion: TipoModel = null;

  maxDate: string;

  private interval;
  private subscriber: Subscription;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createFrom();

    if (this.setCaso) {
      this.subscriber = this.setCaso.subscribe(caso => {
        this.formGroupCase.patchValue(caso);
        if (caso.fecha_inicio) {
          this.formGroupCase.patchValue({
            'fecha_inicio': this.getDateTimeInput(new Date(caso.fecha_inicio)),
          });
        } else {
          this.formGroupCase.patchValue({
            'fecha_inicio': this.getDateTimeInput(new Date()),
          })
        }
        if (caso.fecha_fin) {
          this.formGroupCase.patchValue({
            'fecha_fin': this.getDateTimeInput(new Date(caso.fecha_fin)),
          });
        }
      });
    }
    this.updateMaxDate();
    this.interval = setInterval(() => {
      this.updateMaxDate();
    }, 30000);
  }

  private updateMaxDate() {
    this.maxDate = this.getDateTimeInput(new Date());
  }

  get minDateFinal() {
    return this.formGroupCase.get('fecha_inicio').value || '';
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    clearInterval(this.interval);
  }

  private createFrom() {
    this.formGroupCase = this._formBuilder.group({
      id: [null],
      observaciones: [null, [Validators.required]],
      narrativa: [null, [Validators.required]],
      fuente: [null, [Validators.required]],
      fecha_inicio: [null, [Validators.required]],
      fecha_fin: [null, [Validators.required]],
      linea_intervencion: [null, [Validators.required]],
      origen: [null, [Validators.required]],
      nombre_llama: [null],
      documento_llama: [null],
      descripcion_motivo: [null],
      descripcion_relacion: [null],
      descripcion_radicado: [null],
      paciente: [null],
      motivo_consulta: [null, [Validators.required]],
      motivo_consulta_especifico: [null],
      quien_comunica: [null],
      turno: [null, [Validators.required]],
      etnicidad: [null],
      relacion: [null],
      remision: [null],
      respuesta: [null],
      radicado: [null],
    });
    this.setFormGroupCase.emit(this.formGroupCase);
  }

  get paciente() {
    return this.formGroupCase.get('paciente');
  }

  get turnos() {
    return this.dataCase.turnos;
  }

  get quienes_comunican() {
    return this.dataCase.quienComunica;
  }

  get origenes() {
    return this.dataCase.origenes;
  }

  // get tipo_pacientes() {
  //   return this.dataCase.tipoPacientes;
  // }

  get motivo_consultas() {
    return this.dataCase.motivosConsultas;
  }

  get motivo_consulta_especificos() {
    if (!this.motivoConsulta || !this.motivoConsulta.id) {
      return [];
    }
    return this.dataCase.motivosConsultaEspecificos.filter(especifico => {
      return especifico.motivo_consulta_id == this.motivoConsulta.id;
    });
  }

  get has_motivos_especificos() {
    return this.motivo_consulta_especificos.length > 0;
  }

  get linea_intervenciones() {
    return this.dataCase.lineaIntervenciones;
  }

  get se_comunica_otra_persona() {
    const value: TipoModel = this.formGroupCase.get('quien_comunica').value;
    if (!value) {
      return false;
    }
    return value.name.toLocaleLowerCase().includes("otra");
  }

  get is_remision() {
    const value: TipoModel = this.formGroupCase.get('linea_intervencion').value;
    if (!value) {
      return false;
    }
    return value.name.toLocaleLowerCase().includes("remisión");
  }

  get remisiones() {
    return this.dataCase.remisiones;
  }

  get respuestas() {
    return this.dataCase.respuestas;
  }

  clearMotivoEspecifico() {
    this.formGroupCase.get('motivo_consulta_especifico').patchValue(null);
  }

  compare(item: TipoModel, item2: TipoModel) {
    if (item && item2) {
      return item.id === item2.id;
    }
    return item === item2;
  }

  onSetFormGroupPaciente(form: FormGroup) {
    this.setFormGroupPaciente.emit(form);
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

  private getDateTimeInput(date: Date) {
    const time = date.toTimeString().slice(0, 5);
    const fecha = this.getDateInput(date);
    return `${fecha}T${time}`;
  }
}
