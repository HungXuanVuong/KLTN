import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecatagoryComponent } from './deletecatagory.component';

describe('DeletecatagoryComponent', () => {
  let component: DeletecatagoryComponent;
  let fixture: ComponentFixture<DeletecatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletecatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
