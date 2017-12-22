import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitiettinComponent } from './chitiettin.component';

describe('ChitiettinComponent', () => {
  let component: ChitiettinComponent;
  let fixture: ComponentFixture<ChitiettinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiettinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiettinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
