import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaItemComponent } from './estadistica-item.component';

describe('EstadisticaItemComponent', () => {
  let component: EstadisticaItemComponent;
  let fixture: ComponentFixture<EstadisticaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
