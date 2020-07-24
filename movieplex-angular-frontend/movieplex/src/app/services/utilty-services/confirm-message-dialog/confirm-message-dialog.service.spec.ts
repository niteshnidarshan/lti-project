import { TestBed } from '@angular/core/testing';

import { ConfirmMessageDialogService } from './confirm-message-dialog.service';

describe('ConfirmMessageDialogService', () => {
  let service: ConfirmMessageDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmMessageDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
