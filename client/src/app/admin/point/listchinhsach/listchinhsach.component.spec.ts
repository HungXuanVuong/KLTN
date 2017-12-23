import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchinhsachComponent } from './listchinhsach.component';

describe('ListchinhsachComponent', () => {
  let component: ListchinhsachComponent;
  let fixture: ComponentFixture<ListchinhsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListchinhsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListchinhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
