import { Component, OnInit } from "@angular/core";
import { ExcelReportService } from "src/app/excel.report.service";
import { PsicologoStatisticModel } from 'src/app/Models/psicologo-statistic.model';
import { CasoService } from 'src/app/Services/Psicologo/caso.service';

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.component.html",
  styleUrls: ["./estadisticas.component.css"],
})
export class EstadisticasComponent implements OnInit {
  showStats: boolean = false;
  showExportButton: boolean = false;

  fecha_inicio = "";
  fecha_fin = "";

  psicologoStatistics: PsicologoStatisticModel = {
    casos_by_origen: [],
    casos_edades: [],
    casos_genero: [],
    casos_linea_intervencion: [],
    casos_motivo_consulta: [],
    casos_municipios: [],
    casos_psicologo: [],
    casos_sexo: [],
    casos_zona: [],
    total: 0
  };

  constructor(
    private excelService: ExcelReportService,
    private _casoService: CasoService,
  ) { }

  ngOnInit() { }

  getCases() {
    this.showStats = false;
    this._casoService.getStatisticsByDate(
      this.fecha_inicio,
      this.fecha_fin
    ).subscribe(resp => {
      this.showStats = true;
      this.psicologoStatistics = resp;
    });
  }

  exportAsXLSX() {
    // this.showExportButton = false;
    // let casosJson = [];
    // casosJson = this.casesToExport as [];
    // this.excelService.exportAsExcelFile(casosJson, "reporte");
  }
}
