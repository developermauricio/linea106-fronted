import { AnuncioDataService } from "../../anuncio.data.service";
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: "app-psicologo.inicio",
  templateUrl: "./psicologo.inicio.component.html",
  styleUrls: ["./psicologo.inicio.component.css"]
})
export class PsicologoInicioComponent implements OnInit {
  anuncios: Observable<any[]>;
  constructor(
    private anuncioDataService: AnuncioDataService,
  ) {}

  ngOnInit() {
    this.anuncios = this.anuncioDataService.getAnuncios();
  }
}
