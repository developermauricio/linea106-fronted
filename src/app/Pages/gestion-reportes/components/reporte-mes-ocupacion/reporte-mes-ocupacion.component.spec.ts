import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesOcupacionComponent } from './reporte-mes-ocupacion.component';

describe('ReporteMesOcupacionComponent', () => {
  let component: ReporteMesOcupacionComponent;
  let fixture: ComponentFixture<ReporteMesOcupacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesOcupacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesOcupacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
