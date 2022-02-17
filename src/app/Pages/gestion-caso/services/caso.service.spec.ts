import { TestBed } from '@angular/core/testing';

import { CasoService } from './caso.service';

describe('CasoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasoService = TestBed.get(CasoService);
    expect(service).toBeTruthy();
  });
});
