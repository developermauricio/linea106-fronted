import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCasoComponent } from './mostrar-caso.component';

describe('MostrarCasoComponent', () => {
  let component: MostrarCasoComponent;
  let fixture: ComponentFixture<MostrarCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarCasoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
