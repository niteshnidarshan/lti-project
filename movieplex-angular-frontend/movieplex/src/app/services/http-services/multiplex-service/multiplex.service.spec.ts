import { TestBed } from '@angular/core/testing';

import { MultiplexService } from './multiplex.service';

describe('MultiplexService', () => {
  let service: MultiplexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
