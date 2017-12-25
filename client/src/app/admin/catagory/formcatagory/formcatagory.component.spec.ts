import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcatagoryComponent } from './formcatagory.component';

describe('FormcatagoryComponent', () => {
  let component: FormcatagoryComponent;
  let fixture: ComponentFixture<FormcatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
