import { TestBed } from '@angular/core/testing';

import { AllocateMovieDialogService } from './allocate-movie-dialog.service';

describe('AllocateMovieDialogService', () => {
  let service: AllocateMovieDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllocateMovieDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
