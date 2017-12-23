import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsharedComponent } from './listshared.component';

describe('ListsharedComponent', () => {
  let component: ListsharedComponent;
  let fixture: ComponentFixture<ListsharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
