import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaohangComponent } from './giaohang.component';

describe('GiaohangComponent', () => {
  let component: GiaohangComponent;
  let fixture: ComponentFixture<GiaohangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaohangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
