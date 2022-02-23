import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteConductaSuicidaComponent } from './reporte-conducta-suicida.component';

describe('ReporteConductaSuicidaComponent', () => {
  let component: ReporteConductaSuicidaComponent;
  let fixture: ComponentFixture<ReporteConductaSuicidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteConductaSuicidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteConductaSuicidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
