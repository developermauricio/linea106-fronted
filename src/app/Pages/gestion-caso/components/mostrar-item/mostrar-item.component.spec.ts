import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarItemComponent } from './mostrar-item.component';

describe('MostrarItemComponent', () => {
  let component: MostrarItemComponent;
  let fixture: ComponentFixture<MostrarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
