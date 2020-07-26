import { TestBed } from '@angular/core/testing';

import { SuperCheckAuthGuardService } from './super-check-auth-guard.service';

describe('SuperCheckAuthGuardService', () => {
  let service: SuperCheckAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperCheckAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
