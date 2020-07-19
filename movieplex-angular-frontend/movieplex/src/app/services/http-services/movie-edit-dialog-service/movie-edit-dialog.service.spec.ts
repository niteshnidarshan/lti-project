import { TestBed } from '@angular/core/testing';

import { MovieEditDialogService } from './movie-edit-dialog.service';

describe('MovieEditDialogService', () => {
  let service: MovieEditDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieEditDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
