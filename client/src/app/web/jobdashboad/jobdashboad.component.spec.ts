import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdashboadComponent } from './jobdashboad.component';

describe('JobdashboadComponent', () => {
  let component: JobdashboadComponent;
  let fixture: ComponentFixture<JobdashboadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdashboadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
