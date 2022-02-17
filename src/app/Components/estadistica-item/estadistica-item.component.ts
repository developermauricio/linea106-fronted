import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica-item',
  templateUrl: './estadistica-item.component.html',
  styleUrls: ['./estadistica-item.component.css']
})
export class EstadisticaItemComponent implements OnInit {

  @Input() nombre: string;
  @Input() total: number;

  constructor() { }

  ngOnInit() {
  }

}
