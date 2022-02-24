import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesZonaComponent } from './reporte-mes-zona.component';

describe('ReporteMesZonaComponent', () => {
  let component: ReporteMesZonaComponent;
  let fixture: ComponentFixture<ReporteMesZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
