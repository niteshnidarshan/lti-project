import { TestBed } from '@angular/core/testing';

import { UserAdminDialogService } from './user-admin-dialog.service';

describe('UserAdminDialogService', () => {
  let service: UserAdminDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
