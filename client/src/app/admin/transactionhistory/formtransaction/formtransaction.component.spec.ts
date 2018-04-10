import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtransactionComponent } from './formtransaction.component';

describe('FormtransactionComponent', () => {
  let component: FormtransactionComponent;
  let fixture: ComponentFixture<FormtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
