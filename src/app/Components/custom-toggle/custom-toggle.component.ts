import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-toggle',
  templateUrl: './custom-toggle.component.html',
  styleUrls: ['./custom-toggle.component.scss']
})
export class CustomToggleComponent implements OnInit {

  @Input() size: number = 30;
  @Input() showMsg: boolean = false;
  @Input() msgTrue: string = 'Activo';
  @Input() msgFalse: string = 'Inactivo';

  @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get customChecked(){
    return Boolean(Number(this.checked));
  }

  get fontSize() {
    return `${this.size / 300}rem`;
  }

  get adicionalText() {
    return this.checked ? this.msgTrue : this.msgFalse;
  }

  toggleClick(){
    this.checkedChange.emit(!this.checked);
  }

}
