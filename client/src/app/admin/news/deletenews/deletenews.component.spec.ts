import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletenewsComponent } from './deletenews.component';

describe('DeletenewsComponent', () => {
  let component: DeletenewsComponent;
  let fixture: ComponentFixture<DeletenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
