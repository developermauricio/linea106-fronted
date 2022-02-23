import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesTurnosComponent } from './reporte-mes-turnos.component';

describe('ReporteMesTurnosComponent', () => {
  let component: ReporteMesTurnosComponent;
  let fixture: ComponentFixture<ReporteMesTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
