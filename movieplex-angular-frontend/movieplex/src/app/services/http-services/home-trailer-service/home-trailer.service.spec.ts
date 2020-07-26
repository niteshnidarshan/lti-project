import { TestBed } from '@angular/core/testing';

import { HomeTrailerService } from './home-trailer.service';

describe('HomeTrailerService', () => {
  let service: HomeTrailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeTrailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
