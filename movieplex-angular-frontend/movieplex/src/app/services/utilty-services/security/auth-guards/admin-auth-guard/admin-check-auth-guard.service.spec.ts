import { TestBed } from '@angular/core/testing';

import { AdminCheckAuthGuardService } from './admin-check-auth-guard.service';

describe('AdminCheckAuthGuardService', () => {
  let service: AdminCheckAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCheckAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
