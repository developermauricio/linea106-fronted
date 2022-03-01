import { Component, OnInit } from "@angular/core";
import { Subject } from 'rxjs';
import { CasoModel } from 'src/app/Models/caso.model';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { CasoService } from 'src/app/Services/Psicologo/caso.service';

@Component({
  selector: "app-psicologo.casos",
  templateUrl: "./psicologo.casos.component.html",
  styleUrls: ["./psicologo.casos.component.css"],
})
export class PsicologoCasosComponent implements OnInit {
  private params: string = '';
  casos: PaginateModel<CasoModel> = { data: [] };

  psicologoId: string;

  casoAbiertoId: string;
  showCase: Subject<number> = new Subject();

  constructor(
    private _casoService: CasoService
  ) { }

  ngOnInit() {
    this.getCases();
  }

  getCases() {
    this._casoService.getAll(this.params).subscribe((resp) => {
      this.casos = resp;
    });
  }

  updatePagination(params) {
    this.params = params;
    this.getCases();
  }

};
