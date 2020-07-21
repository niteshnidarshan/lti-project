import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplexEntryComponent } from './multiplex-entry.component';

describe('MultiplexEntryComponent', () => {
  let component: MultiplexEntryComponent;
  let fixture: ComponentFixture<MultiplexEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplexEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplexEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
