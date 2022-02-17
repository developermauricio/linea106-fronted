import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPacienteComponent } from './frm-paciente.component';

describe('FrmPacienteComponent', () => {
  let component: FrmPacienteComponent;
  let fixture: ComponentFixture<FrmPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
