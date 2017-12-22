import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UvdagtComponent } from './uvdagt.component';

describe('UvdagtComponent', () => {
  let component: UvdagtComponent;
  let fixture: ComponentFixture<UvdagtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UvdagtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UvdagtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
