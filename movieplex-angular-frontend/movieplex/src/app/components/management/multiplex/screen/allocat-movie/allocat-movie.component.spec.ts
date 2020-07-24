import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatMovieComponent } from './allocat-movie.component';

describe('AllocatMovieComponent', () => {
  let component: AllocatMovieComponent;
  let fixture: ComponentFixture<AllocatMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
