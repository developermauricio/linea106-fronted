import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesGeneroComponent } from './reporte-mes-genero.component';

describe('ReporteMesGeneroComponent', () => {
  let component: ReporteMesGeneroComponent;
  let fixture: ComponentFixture<ReporteMesGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
