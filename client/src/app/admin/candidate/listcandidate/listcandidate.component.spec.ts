import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcandidateComponent } from './listcandidate.component';

describe('ListcandidateComponent', () => {
  let component: ListcandidateComponent;
  let fixture: ComponentFixture<ListcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
