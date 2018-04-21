import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormprofileComponent } from './formprofile.component';

describe('FormprofileComponent', () => {
  let component: FormprofileComponent;
  let fixture: ComponentFixture<FormprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
