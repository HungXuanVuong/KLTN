import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcandidateComponent } from './formcandidate.component';

describe('FormcandidateComponent', () => {
  let component: FormcandidateComponent;
  let fixture: ComponentFixture<FormcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
