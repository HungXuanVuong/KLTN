import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UvdanggtComponent } from './uvdanggt.component';

describe('UvdanggtComponent', () => {
  let component: UvdanggtComponent;
  let fixture: ComponentFixture<UvdanggtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UvdanggtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UvdanggtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
