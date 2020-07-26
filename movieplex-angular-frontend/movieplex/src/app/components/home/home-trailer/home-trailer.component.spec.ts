import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrailerComponent } from './home-trailer.component';

describe('HomeTrailerComponent', () => {
  let component: HomeTrailerComponent;
  let fixture: ComponentFixture<HomeTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
