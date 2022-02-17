import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCasoComponent } from './actualizar-caso.component';

describe('ActualizarCasoComponent', () => {
  let component: ActualizarCasoComponent;
  let fixture: ComponentFixture<ActualizarCasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarCasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
