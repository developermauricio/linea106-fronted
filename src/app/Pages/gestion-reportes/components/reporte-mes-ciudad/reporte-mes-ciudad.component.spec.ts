import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesCiudadComponent } from './reporte-mes-ciudad.component';

describe('ReporteMesCiudadComponent', () => {
  let component: ReporteMesCiudadComponent;
  let fixture: ComponentFixture<ReporteMesCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesCiudadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
