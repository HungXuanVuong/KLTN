import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlingprocessComponent } from './handlingprocess.component';

describe('HandlingprocessComponent', () => {
  let component: HandlingprocessComponent;
  let fixture: ComponentFixture<HandlingprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlingprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlingprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
