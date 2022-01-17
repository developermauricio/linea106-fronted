import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { CasoModel } from 'src/app/Models/caso.model';
import { PacienteModel } from 'src/app/Models/paciente.model';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { TipoModel } from 'src/app/Models/tipo.model';
import { UserModel } from 'src/app/Models/user.model';
import { CasoService } from 'src/app/Services/Admin/caso.service';

@Component({
  selector: "app-casos",
  templateUrl: "./admin.casos.component.html",
  styleUrls: ["./admin.casos.component.css"],
})
export class AdminCasosComponent implements OnInit {
  @ViewChild("casoForm") caseForm: NgForm;
  @ViewChild("casoDataForm") caseDataForm: NgForm;
  @ViewChild("pacienteForm") patientForm: NgForm;
  source: LocalDataSource;
  private params: string = '';
  private filtros: any[] = [];
  casos: PaginateModel<CasoModel> = { data: [] };

  psicologoId: string;

  casoAbiertoId: string;
  showCase: Subject<number> = new Subject();

  constructor(
    private toastrService: NbToastrService,
    private _casoService: CasoService
  ) { }

  ngOnInit() {
    this.source = new LocalDataSource();
    this.source.onChanged().subscribe(d => {
      if (d.action === "filter") {
        this.filtros = d.filter.filters;
        this.updatePagination('page=1');
      }
    });
    this.getCases();
  }

  get filters() {
    let params = '';
    this.filtros.forEach(d => {
      if (d.search) {
        params += `${d.field}=${d.search}&`;
      }
    });
    return params;
  }

  get paramsServer() {
    return this.filters + this.params;
  }

  updatePagination(params) {
    this.params = params;
    this.getCases();
  }

  getCases() {
    this._casoService.getAll(this.paramsServer).subscribe((resp) => {
      this.casos = resp;
      this.source.load(this.casos.data);
    });
  }

  settings = {
    pager: {
      perPage: 50,
    },
    noDataMessage: "No se hallaron registros, intenta nuevamente.",
    columns: {
      usuario: {
        title: "Psicólogo",
        type: "string",
        valuePrepareFunction: (usuario: UserModel) => `${usuario.name || ''} ${usuario.last_name || ''}`,
        filterFunction: () => true,
      },
      motivo_consulta: {
        title: "Motivo",
        type: "string",
        valuePrepareFunction: (motivo_consulta: TipoModel) => motivo_consulta.name,
        filterFunction: () => true,
      },
      origen: {
        title: "Origen",
        type: "string",
        valuePrepareFunction: (origen: TipoModel) => origen.name,
        filterFunction: () => true,
      },
      fuente: {
        title: "Fuente",
        type: "string",
        filterFunction: () => true,
      },
      paciente: {
        title: "Usuario",
        type: "string",
        valuePrepareFunction: (paciente: PacienteModel) => {
          if (!paciente) {
            return 'N/A';
          }
          return `${paciente.nombre || ''} ${paciente.apellido || ''}`.trim() || 'N/A';
        },
        filterFunction: () => true,
      },
      fecha_inicio: {
        title: "Fecha",
        type: "date",
        valuePrepareFunction: (date: number) => this.convertTimestamp(date),
        filterFunction: () => true,
      },
      linea_intervencion: {
        title: "Intervención",
        type: "string",
        valuePrepareFunction: (linea_intervencion: TipoModel) => {
          return `${linea_intervencion?.name || ''}`.trim() || 'N/A';
        },
        filterFunction: () => true,
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
      const data: CasoModel = row.data;
      const respuesta = (data.respuesta?data.respuesta.name:'').toLocaleLowerCase();
      if (respuesta === "oficio enviado") return "enviado";
      if (respuesta === "oficio recibido") return "recibido";
      if (respuesta === "respuesta de la entidad") return "respuesta";
      if (respuesta === "caso cerrado") return "cerrado";
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
}
