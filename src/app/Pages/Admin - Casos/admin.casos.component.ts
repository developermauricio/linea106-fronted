import { Component, OnInit } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { Subject } from 'rxjs';
import { CasoModel } from 'src/app/Models/caso.model';
import { PaginateModel } from 'src/app/Models/paginate.model';
import { CasoService } from 'src/app/Services/Admin/caso.service';

@Component({
  selector: "app-casos",
  templateUrl: "./admin.casos.component.html",
  styleUrls: ["./admin.casos.component.css"],
})
export class AdminCasosComponent implements OnInit {

  private params: string = '';
  casos: PaginateModel<CasoModel> = { data: [] };

  psicologoId: string;

  casoAbiertoId: string;
  showCase: Subject<number> = new Subject();

  constructor(
    private toastrService: NbToastrService,
    private _casoService: CasoService
  ) { }

  ngOnInit() {
    this.getCases();
  }

  updatePagination(params) {
    this.params = params;
    this.getCases();
  }

  getCases() {
    this._casoService.getAll(this.params).subscribe((resp) => {
      this.casos = resp;
    });
  }

}
