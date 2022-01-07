import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/Services/Psicologo/anuncio.service';
import { AnuncioModel } from 'src/app/Models/anuncio.model';

@Component({
  selector: "app-psicologo.inicio",
  templateUrl: "./psicologo.inicio.component.html",
  styleUrls: ["./psicologo.inicio.component.css"]
})
export class PsicologoInicioComponent implements OnInit {

  anuncios: AnuncioModel[];

  constructor(
    private _anuncioService: AnuncioService,
  ) { }

  ngOnInit() {
    this._anuncioService.getAll().subscribe(res => {
      this.anuncios = res;
    });
  }

  titleAnuncio(item: AnuncioModel){
    return item.title;
  }
}
