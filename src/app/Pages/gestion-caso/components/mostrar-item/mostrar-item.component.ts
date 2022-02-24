import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-item',
  templateUrl: './mostrar-item.component.html',
  styleUrls: ['./mostrar-item.component.css']
})
export class MostrarItemComponent {

  @Input() title: string;
  @Input() text: string;
}
