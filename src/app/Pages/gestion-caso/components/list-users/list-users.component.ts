import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {


  private timeout = null;

  pacientes: PacienteModel[] = [];

  @Output() selectPaciente: EventEmitter<PacienteModel> = new EventEmitter();

  constructor(private _pacienteService: PacienteService) { }

  ngOnInit() {
  }


  searchPaciente(event: any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.search(event.target.value);
    }, 400);
  }

  search(term: string) {
    this._pacienteService.searchPaciente(term.trim()).subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  seleccionar(paciente: PacienteModel) {
    this._pacienteService.getPacienteById(paciente.id).subscribe(p => {
      this.selectPaciente.emit(p);
    });
  }

}
