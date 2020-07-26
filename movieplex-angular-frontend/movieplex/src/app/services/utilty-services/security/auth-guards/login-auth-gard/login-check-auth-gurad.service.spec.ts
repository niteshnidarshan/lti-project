import { TestBed } from '@angular/core/testing';

import { LoginCheckAuthGuradService } from './login-check-auth-gurad.service';

describe('LoginCheckAuthGuradService', () => {
  let service: LoginCheckAuthGuradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginCheckAuthGuradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
