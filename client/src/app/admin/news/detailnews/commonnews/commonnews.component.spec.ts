import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonnewsComponent } from './commonnews.component';

describe('CommonnewsComponent', () => {
  let component: CommonnewsComponent;
  let fixture: ComponentFixture<CommonnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
