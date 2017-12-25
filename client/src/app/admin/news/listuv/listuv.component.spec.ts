import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListuvComponent } from './listuv.component';

describe('ListuvComponent', () => {
  let component: ListuvComponent;
  let fixture: ComponentFixture<ListuvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListuvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListuvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
