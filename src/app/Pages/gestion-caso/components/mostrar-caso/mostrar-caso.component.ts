import { Component, Input, OnInit } from '@angular/core';
import { CasoModel } from 'src/app/Models/caso.model';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { TipoModel } from 'src/app/Models/tipo.model';

@Component({
  selector: 'app-mostrar-caso',
  templateUrl: './mostrar-caso.component.html',
  styleUrls: ['./mostrar-caso.component.css']
})
export class MostrarCasoComponent implements OnInit {

  @Input() caso: CasoModel;

  @Input() paciente: PacienteModel = {
    identificacion: null,
  };

  constructor() { }

  ngOnInit(): void {
  }

  get nombrePaciente() {
    return `${this.paciente.nombre||''} ${this.paciente.apellido || ''}`.trim()
  }

  getNameTipo(tipo: TipoModel) {
    if (tipo) {
      return tipo.name;
    }
    return '';
  }

  hasText(text: string) {
    if (!text) {
      return false;
    } else {
      return Boolean(text.trim());
    }
  }

}
