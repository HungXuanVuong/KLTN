import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormgioithieuComponent } from './formgioithieu.component';

describe('FormgioithieuComponent', () => {
  let component: FormgioithieuComponent;
  let fixture: ComponentFixture<FormgioithieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormgioithieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormgioithieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
