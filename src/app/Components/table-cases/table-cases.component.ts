import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CasoModel } from 'src/app/Models/caso.model';
import { FilterData } from 'src/app/Models/filter-data';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { CasoService } from 'src/app/Services/Common/caso.service';

@Component({
  selector: 'app-table-cases',
  templateUrl: './table-cases.component.html',
  styleUrls: ['./table-cases.component.css']
})
export class TableCasesComponent implements OnInit {

  @Input() cases: PaginateModel<CasoModel> = { data: [] };
  @Input() hiddenFilterPsicologo = false;
  @Output() onSearchCases: EventEmitter<any> = new EventEmitter();
  @Output() onShowCase: EventEmitter<CasoModel> = new EventEmitter();

  filterData: FilterData = {
    lineas_intervencion: [],
    motivos: [],
    origenes: [],
    psicologos: [],
  };

  psicologo = null;
  motivo = null;
  origen = null;
  intervencion = null;
  fuente = '';
  paciente = '';
  fecha = null;

  private time = null;

  constructor(private casoService: CasoService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.casoService.getFiltersTable().subscribe(resp => {
      this.filterData = resp;
      console.log(resp);
    });
  }

  get casesData() {
    if (this.cases && this.cases.data) {
      return this.cases.data;
    }
    return [];
  }

  get filters() {
    let query = '';
    if (this.psicologo) {
      query += 'usuario=' + this.psicologo + '&';
    }
    if (this.motivo) {
      query += 'motivo_consulta=' + this.motivo + '&';
    }
    if (this.origen) {
      query += 'origen=' + this.origen + '&';
    }
    if (this.intervencion) {
      query += 'linea_intervencion=' + this.intervencion + '&';
    }
    if (this.fuente.trim()) {
      query += 'fuente=' + this.fuente + '&';
    }
    if (this.paciente.trim()) {
      query += 'paciente=' + this.paciente + '&';
    }
    if (this.fecha) {
      query += 'fecha=' + this.fecha + '&';
    }

    return query;
  }

  updatePagination(data) {
    this.onSearchCases.emit(this.filters + data);
  }

  updateFilter() {
    this.onSearchCases.emit(this.filters + 'page=1');
  }

  updateFilterInput() {
    if (this.time) {
      clearTimeout(this.time);
    }
    this.time = setTimeout(() => {
      this.onSearchCases.emit(this.filters + 'page=1');
    }, 500);
  }

  getPsicologo(caso: CasoModel) {
    if (caso.usuario_id) {
      return `${caso.usuario.name || ''} ${caso.usuario.last_name || ''}`.trim();
    }
    return 'N/A';
  }

  getMotivo(caso: CasoModel) {
    if (caso.motivo_consulta_id) {
      return caso.motivo_consulta.name;
    }
    return 'N/A';
  }

  getOrigen(caso: CasoModel) {
    if (caso.origen_id) {
      return caso.origen.name;
    }
    return 'N/A';
  }

  getFuente(caso: CasoModel) {
    if (caso.fuente) {
      return caso.fuente;
    }
    return 'N/A';
  }

  getLineaIntervencion(caso: CasoModel) {
    if (caso.linea_intervencion_id) {
      return caso.linea_intervencion.name;
    }
    return 'N/A';
  }

  getUsuario(caso: CasoModel) {
    if (caso.paciente_id) {
      return `${caso.paciente.nombre || ''} ${caso.paciente.apellido || ''}`.trim() || 'N/A';
    }
    return 'N/A';
  }

  showCase(caso: CasoModel) {
    this.onShowCase.emit(caso);
  }

  getCustomClass(caso: CasoModel) {
    if (caso.respuesta_id) {
      const respuesta = (caso.respuesta ? caso.respuesta.name : '').toLocaleLowerCase();
      if (respuesta.includes("enviado")) return "caso-enviado";
      if (respuesta.includes("recibido")) return "caso-recibido";
      if (respuesta.includes("respuesta")) return "caso-respuesta";
      if (respuesta.includes("cerrado")) return "caso-cerrado";
    }
  }

  get sinCasos() {
    return this.casesData.length == 0;
  }


}
