import { Component, OnInit } from "@angular/core";
import { CaseDataService } from "src/app/case.data.service";
import { PatientDataService } from "src/app/patient.data.service";
import { ExcelReportService } from "src/app/excel.report.service";

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.component.html",
  styleUrls: ["./estadisticas.component.css"],
})
export class EstadisticasComponent implements OnInit {
  showStats: boolean = false;
  showExportButton: boolean = false;
  showCalculateButton: boolean = false;
  casesToExport = [];

  fecha_inicio = "";
  fecha_fin = "";

  zonas = [
    { nombre: "Anónimo", cantidad: 0 },
    { nombre: "Rural", cantidad: 0 },
    { nombre: "Urbana", cantidad: 0 },
  ];

  edades = [
    { nombre: "Anónimo", cantidad: 0 },
    { nombre: "Entre 1 y 10 años", cantidad: 0 },
    { nombre: "Entre 11 y 20 años", cantidad: 0 },
    { nombre: "Entre 21 y 30 años", cantidad: 0 },
    { nombre: "Entre 31 y 40 años", cantidad: 0 },
    { nombre: "Entre 41 y 50 años", cantidad: 0 },
    { nombre: "Más de 50 años", cantidad: 0 },
  ];

  municipios = [{ nombre: "Anónimo", cantidad: 0 }];
  sexos = [];
  generos = [];

  motivos = [];
  psicologos = [];
  intervenciones = [];

  totalCases: number = 0;
  totalCasesBuzon: number = 0;
  totalCasesRedes: number = 0;
  totalCasesPhone: number = 0;
  totalCasesCorreo: number = 0;
  totalCasesWhatsapp: number = 0;

  constructor(
    private excelService: ExcelReportService,
    private caseDataService: CaseDataService,
    private patientDataService: PatientDataService
  ) {}

  ngOnInit() {}

  getCases() {
    this.showCalculateButton = true;
    this.caseDataService
      .getCasesFilterByDate(
        new Date(this.fecha_inicio).valueOf(),
        new Date(this.fecha_fin).valueOf()
      )
      .subscribe((resp) => {
        this.processCases(resp);
      });
  }

  processCases(casos) {
    this.casesToExport = casos;
    casos.forEach((caso, index) => {
      this.totalCases++;
      /* Parsing Timestamp to ISO DATE */
      this.parseIsoDateCase(index, "ultima_actualizacion");
      this.parseIsoDateCase(index, "fecha_inicio");
      this.parseIsoDateCase(index, "fecha_fin");
      /* Merge patient data with case */
      this.addPatientToCase(caso["paciente"], index);
      /* Get stats of patient and case */
      this.getPatientStats(caso["paciente"]);
      this.getCaseStats(caso);
    });
  }

  addPatientToCase(patientId, index) {
    this.patientDataService.getPatientById(patientId).subscribe((paciente) => {
      if (paciente) {
        delete paciente["id"];
        this.casesToExport[index] = Object.assign(
          this.casesToExport[index],
          paciente
        );
      }
    });
  }

  getCaseStats(caso) {
    this.showStats = true;
    this.showExportButton = true;
    this.getOrigenStats(caso);
    this.populateCounterStats(this.psicologos, caso["psicologo"]);
    this.populateCounterStats(this.motivos, caso["motivoConsulta"]);
    this.populateCounterStats(this.intervenciones, caso["linea_intervencion"]);
  }

  getOrigenStats(caso) {
    if (caso["origen"] == "Teléfono") this.totalCasesPhone++;
    else if (caso["origen"] == "Whatsapp") this.totalCasesWhatsapp++;
    else if (caso["origen"] == "Redes Sociales") this.totalCasesRedes++;
    else if (caso["origen"] == "Correo") this.totalCasesCorreo++;
    else if (caso["origen"] == "Buzón") this.totalCasesBuzon++;
    else console.log("Error: Caso no tiene origen");
  }

  getPatientStats(patient) {
    if (patient)
      this.patientDataService.getPatientById(patient).subscribe((resp) => {
        if (resp) {
          this.getEdadStats(resp);
          this.getSectorStats(resp);
          this.populateCounterStats(this.sexos, resp["sexo"]);
          this.populateCounterStats(this.generos, resp["genero"]);
          this.populateCounterStats(this.municipios, resp["municipio"]);
        } else {
          this.municipios[0]["cantidad"]++;
          this.generos[0]["cantidad"]++;
          this.edades[0]["cantidad"]++;
          this.sexos[0]["cantidad"]++;
          this.zonas[0]["cantidad"]++;
        }
      });
    else {
      this.municipios[0]["cantidad"]++;
      this.generos[0]["cantidad"]++;
      this.edades[0]["cantidad"]++;
      this.sexos[0]["cantidad"]++;
      this.zonas[0]["cantidad"]++;
    }
  }

  getEdadStats(resp) {
    if (resp && resp["edad"] && resp["edad"] > 0) {
      if (resp["edad"] > 0 && resp["edad"] < 11) this.edades[1]["cantidad"]++;
      else if (resp["edad"] > 10 && resp["edad"] < 21)
        this.edades[2]["cantidad"]++;
      else if (resp["edad"] > 20 && resp["edad"] < 31)
        this.edades[3]["cantidad"]++;
      else if (resp["edad"] > 30 && resp["edad"] < 41)
        this.edades[4]["cantidad"]++;
      else if (resp["edad"] > 40 && resp["edad"] < 51)
        this.edades[5]["cantidad"]++;
      else if (resp["edad"] > 50) this.edades[6]["cantidad"]++;
      else this.edades[0]["cantidad"]++;
    } 
    else this.edades[0]["cantidad"]++;
  }

  getSectorStats(patient) {
    if (patient && patient["zona"] && patient["zona"] != "") {
      if (patient["zona"] == "Rural") this.zonas[1]["cantidad"]++;
      else if (patient["zona"] == "Urbana") this.zonas[2]["cantidad"]++;
      else this.zonas[0]["cantidad"]++;
    } else this.zonas[0]["cantidad"]++;
  }

  populateCounterStats(arr, value) {
    let index = arr.findIndex((item) => item.nombre == value);
    if (index > -1) arr[index]["cantidad"]++;
    else {
      if (arr[0] && arr[0]["nombre"] == "Anónimo" && (!value || value == ""))
        arr[0]["cantidad"]++;
      else arr.push({ nombre: value, cantidad: 1 });
    }
  }

  parseIsoDateCase(index, param) {
    if (
      this.casesToExport[index][param] &&
      typeof this.casesToExport[index][param] == "number"
    ) {
      this.casesToExport[index][param] = new Date(
        this.casesToExport[index][param]
      ).toISOString();
    }
  }

  handler(input, e) {
    if (input == "inicio") this.fecha_inicio = e.target.value;
    if (input == "fin") this.fecha_fin = e.target.value;
  }

  exportAsXLSX() {
    this.showExportButton = false;
    let casosJson = [];
    casosJson = this.casesToExport as [];
    this.excelService.exportAsExcelFile(casosJson, "reporte");
  }
}
