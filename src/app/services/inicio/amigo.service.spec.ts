import { TestBed } from '@angular/core/testing';

import { AmigoService } from './amigo.service';

describe('AmigoService', () => {
  let service: AmigoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmigoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
