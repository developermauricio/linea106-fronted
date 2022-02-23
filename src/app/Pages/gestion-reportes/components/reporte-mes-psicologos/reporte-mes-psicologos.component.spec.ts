import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesPsicologosComponent } from './reporte-mes-psicologos.component';

describe('ReporteMesPsicologosComponent', () => {
  let component: ReporteMesPsicologosComponent;
  let fixture: ComponentFixture<ReporteMesPsicologosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesPsicologosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesPsicologosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
