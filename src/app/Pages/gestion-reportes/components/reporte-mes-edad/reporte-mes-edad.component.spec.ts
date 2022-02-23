import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesEdadComponent } from './reporte-mes-edad.component';

describe('ReporteMesEdadComponent', () => {
  let component: ReporteMesEdadComponent;
  let fixture: ComponentFixture<ReporteMesEdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesEdadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
