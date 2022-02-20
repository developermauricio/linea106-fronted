import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCantidadCasosComponent } from './reporte-cantidad-casos.component';

describe('ReporteCantidadCasosComponent', () => {
  let component: ReporteCantidadCasosComponent;
  let fixture: ComponentFixture<ReporteCantidadCasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCantidadCasosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCantidadCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
