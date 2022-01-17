import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginateModel } from 'src/app/Models/paginate.model';

@Component({
  selector: 'app-pagination-server',
  templateUrl: './pagination-server.component.html',
  styleUrls: ['./pagination-server.component.css']
})
export class PaginationServerComponent implements OnInit {

  @Input() pagination: PaginateModel<any>;
  @Input() center = true;

  @Output() changePage: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get links() {
    if (!this.pagination?.links) {
      return [];
    }
    return this.pagination.links;
  }

  getName(name) {
    if (Number(name)) {
      return name;
    }
    if (this.isPrev(name)) {
      return '<';
    }
    if (this.isNext(name)) {
      return '>';
    }
    return name;
  }

  private isPrev(name) {
    return name.indexOf('Anterior') !== -1;
  }

  private isNext(name) {
    return name.indexOf('Siguiente') !== -1;
  }

  changePagination(event, link) {
    event.preventDefault();
    if (link.url) {
      const params = link.url.split('?')[1];
      this.changePage.emit(params);
    }
  }

}
