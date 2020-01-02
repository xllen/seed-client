import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Business2Component } from './business2.component';

describe('Business2Component', () => {
  let component: Business2Component;
  let fixture: ComponentFixture<Business2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Business2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Business2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
