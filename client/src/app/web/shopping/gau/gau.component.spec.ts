import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GauComponent } from './gau.component';

describe('GauComponent', () => {
  let component: GauComponent;
  let fixture: ComponentFixture<GauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
