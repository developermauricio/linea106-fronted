import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesTipoPacienteComponent } from './reporte-mes-tipo-paciente.component';

describe('ReporteMesTipoPacienteComponent', () => {
  let component: ReporteMesTipoPacienteComponent;
  let fixture: ComponentFixture<ReporteMesTipoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesTipoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesTipoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
