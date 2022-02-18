import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharJsComponent } from './char-js.component';

describe('CharJsComponent', () => {
  let component: CharJsComponent;
  let fixture: ComponentFixture<CharJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
