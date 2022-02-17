import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SelectFilterComponent)
  }]
})
export class SelectFilterComponent implements OnInit, ControlValueAccessor {

  private listFiltered: any[] = null;

  private time;

  @Input() debounce = false;
  @Input() list: any[] = [];
  @Input() getTitle: (item: any) => string = (item) => { return item; };
  @Input() filter: (searchTerm: string) => Promise<any[]> = (searchTerm) => {
    return new Promise((resolve, reject) => {
      if (!searchTerm?.trim()) {
        resolve(this.list);
      } else {
        const search = RegExp(`^.*${searchTerm.trim()}.*$`, 'i');
        const items = this.list.filter(item => {
          return search.test(this.getTitle(item));
        });
        resolve(items);
      }
    });
  };

  @Output() change: EventEmitter<any> = new EventEmitter();

  search = '';
  selectIndex = 0;
  showList = false;

  constructor() { }

  onChange = (value: any) => { };


  writeValue(obj: any): void {
    this.listFiltered = this.list;
    if (obj == null) {
      this.delete();
    } else {
      const index = this.listFiltered.findIndex(item => {
        return this.getTitle(item).toLocaleLowerCase() === this.getTitle(obj).toLocaleLowerCase();
      });
      if (index < 0) {
        if (!this.listFiltered) {
          this.listFiltered = [];
        }
        this.listFiltered.unshift(obj);
        this.selectItem(0);
      } else {
        this.selectItem(index);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit() { }

  get listItems() {
    if (this.listFiltered === null) {
      return this.list;
    }
    return this.listFiltered;
  }

  select(timeout = true) {
    if (timeout) {
      setTimeout(() => {
        this.showList = false;
      }, 200);
    } else {
      this.showList = false;
    }
    const item = this.listItems[this.selectIndex];
    if (item) {
      this.search = this.getTitle(item);
      this.change.emit(item);
      this.onChange(item);
    }
  }

  pressKeyUp(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.select(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectIndex < (this.listItems.length - 1)) {
          this.selectIndex++;
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectIndex > 0) {
          this.selectIndex--;
        }
        break;
      case 'Tab':
        break;
      default:
        if (this.debounce) {
          clearTimeout(this.time);
          this.time = setTimeout(() => {
            this.filter(this.search).then(resp => {
              this.showList = true;
              this.listFiltered = resp;
            });
          }, 400);
        } else {
          this.filter(this.search).then(resp => {
            this.showList = true;
            this.listFiltered = resp;
          });
        }
        this.selectIndex = 0;
        break;
    }
  }

  selectItem(index) {
    this.selectIndex = index;
    this.select();
  }

  get showDelete() {
    return this.search ? this.search.length > 0 : false;
  }

  delete() {
    this.change.emit(null);
    this.search = '';
    this.selectIndex = 0;
    this.listFiltered = this.list;
    this.onChange(null);
  }
}
