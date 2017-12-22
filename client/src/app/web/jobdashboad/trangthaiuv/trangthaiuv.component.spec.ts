import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangthaiuvComponent } from './trangthaiuv.component';

describe('TrangthaiuvComponent', () => {
  let component: TrangthaiuvComponent;
  let fixture: ComponentFixture<TrangthaiuvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangthaiuvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangthaiuvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
