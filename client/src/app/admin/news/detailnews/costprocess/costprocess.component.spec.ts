import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostprocessComponent } from './costprocess.component';

describe('CostprocessComponent', () => {
  let component: CostprocessComponent;
  let fixture: ComponentFixture<CostprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
