import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormupdateuvComponent } from './formupdateuv.component';

describe('FormupdateuvComponent', () => {
  let component: FormupdateuvComponent;
  let fixture: ComponentFixture<FormupdateuvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormupdateuvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormupdateuvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
