import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMenoresComponent } from './reporte-menores.component';

describe('ReporteMenoresComponent', () => {
  let component: ReporteMenoresComponent;
  let fixture: ComponentFixture<ReporteMenoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMenoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMenoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
