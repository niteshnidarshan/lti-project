import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminDialogComponent } from './user-admin-dialog.component';

describe('UserAdminDialogComponent', () => {
  let component: UserAdminDialogComponent;
  let fixture: ComponentFixture<UserAdminDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
