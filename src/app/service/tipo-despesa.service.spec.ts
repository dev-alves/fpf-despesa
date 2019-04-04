import { TestBed } from '@angular/core/testing';

import { TipoDespesaService } from './tipo-despesa.service';

describe('TipoDespesaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoDespesaService = TestBed.get(TipoDespesaService);
    expect(service).toBeTruthy();
  });
});
