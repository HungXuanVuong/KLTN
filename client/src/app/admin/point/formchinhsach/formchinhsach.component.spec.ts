import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormchinhsachComponent } from './formchinhsach.component';

describe('FormchinhsachComponent', () => {
  let component: FormchinhsachComponent;
  let fixture: ComponentFixture<FormchinhsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormchinhsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormchinhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
