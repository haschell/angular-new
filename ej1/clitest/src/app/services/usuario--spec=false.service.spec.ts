import { TestBed } from '@angular/core/testing';

import { UsuarioSpec=falseService } from './usuario--spec=false.service';

describe('UsuarioSpec=falseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioSpec=falseService = TestBed.get(UsuarioSpec=falseService);
    expect(service).toBeTruthy();
  });
});
