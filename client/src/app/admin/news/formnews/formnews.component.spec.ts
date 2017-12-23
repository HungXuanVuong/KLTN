import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormnewsComponent } from './formnews.component';

describe('FormnewsComponent', () => {
  let component: FormnewsComponent;
  let fixture: ComponentFixture<FormnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
