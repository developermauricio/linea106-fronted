import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesEscolaridadComponent } from './reporte-mes-escolaridad.component';

describe('ReporteMesEscolaridadComponent', () => {
  let component: ReporteMesEscolaridadComponent;
  let fixture: ComponentFixture<ReporteMesEscolaridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesEscolaridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesEscolaridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
