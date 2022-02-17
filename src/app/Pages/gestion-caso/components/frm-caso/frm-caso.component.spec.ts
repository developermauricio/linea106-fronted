import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCasoComponent } from './frm-caso.component';

describe('FrmCasoComponent', () => {
  let component: FrmCasoComponent;
  let fixture: ComponentFixture<FrmCasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
