/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnuncioService } from './anuncio.service';

describe('Service: Anuncio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnuncioService]
    });
  });

  it('should ...', inject([AnuncioService], (service: AnuncioService) => {
    expect(service).toBeTruthy();
  }));
});
