import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesMotivoEspecificoComponent } from './reporte-mes-motivo-especifico.component';

describe('ReporteMesMotivoEspecificoComponent', () => {
  let component: ReporteMesMotivoEspecificoComponent;
  let fixture: ComponentFixture<ReporteMesMotivoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesMotivoEspecificoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesMotivoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
