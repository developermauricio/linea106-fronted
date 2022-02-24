import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesSexoComponent } from './reporte-mes-sexo.component';

describe('ReporteMesSexoComponent', () => {
  let component: ReporteMesSexoComponent;
  let fixture: ComponentFixture<ReporteMesSexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesSexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMesSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
