import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesOrigenComponent } from './reporte-mes-origen.component';

describe('ReporteMesOrigenComponent', () => {
  let component: ReporteMesOrigenComponent;
  let fixture: ComponentFixture<ReporteMesOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesOrigenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
