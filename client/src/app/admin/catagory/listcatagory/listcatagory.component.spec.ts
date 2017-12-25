import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcatagoryComponent } from './listcatagory.component';

describe('ListcatagoryComponent', () => {
  let component: ListcatagoryComponent;
  let fixture: ComponentFixture<ListcatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
