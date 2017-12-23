import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchinhsachComponent } from './editchinhsach.component';

describe('EditchinhsachComponent', () => {
  let component: EditchinhsachComponent;
  let fixture: ComponentFixture<EditchinhsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchinhsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchinhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
