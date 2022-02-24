import { Component, Input, OnInit } from '@angular/core';
import { SeguimientoModel } from 'src/app/Models/seguimiento.model';
import { SeguimientoService } from '../../services/seguimiento.service';

@Component({
  selector: 'app-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.css']
})
export class SeguimientosComponent implements OnInit {

  @Input() idCase: number;

  seguimiento: string = '';
  seguimientos: SeguimientoModel[] = [];

  constructor(
    private _seguimientoService: SeguimientoService
  ) { }

  ngOnInit(): void {
    this._seguimientoService.getSeguimientos(this.idCase).subscribe(resp => {
      this.seguimientos = resp;
    });
  }

  updateTextSeguimiento($event: any) {
    this.seguimiento = $event.target.value;
  }

  addSeguimiento() {
    if (this.seguimiento.trim()) {
      this._seguimientoService.storeSeguimiento({
        caso_id: this.idCase,
        seguimiento: this.seguimiento
      }).subscribe(resp => {
        this.seguimiento = '';
        this.seguimientos.unshift(resp);
      });
    }
  }
}
