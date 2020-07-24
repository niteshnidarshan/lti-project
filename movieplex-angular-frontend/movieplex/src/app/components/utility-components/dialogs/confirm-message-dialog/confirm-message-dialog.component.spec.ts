import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMessageDialogComponent } from './confirm-message-dialog.component';

describe('ConfirmMessageDialogComponent', () => {
  let component: ConfirmMessageDialogComponent;
  let fixture: ComponentFixture<ConfirmMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
