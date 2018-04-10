import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtransactionComponent } from './listtransaction.component';

describe('ListtransactionComponent', () => {
  let component: ListtransactionComponent;
  let fixture: ComponentFixture<ListtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
