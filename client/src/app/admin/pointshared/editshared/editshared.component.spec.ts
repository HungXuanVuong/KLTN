import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsharedComponent } from './editshared.component';

describe('EditsharedComponent', () => {
  let component: EditsharedComponent;
  let fixture: ComponentFixture<EditsharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
