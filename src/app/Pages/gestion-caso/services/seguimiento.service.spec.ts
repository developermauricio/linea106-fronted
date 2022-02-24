/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeguimientoService } from './seguimiento.service';

describe('Service: Seguimiento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeguimientoService]
    });
  });

  it('should ...', inject([SeguimientoService], (service: SeguimientoService) => {
    expect(service).toBeTruthy();
  }));
});
