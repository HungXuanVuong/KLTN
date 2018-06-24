import { ProfiledetailComponent } from './profiledetail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ProfileComponent', () => {
  let component: ProfiledetailComponent;
  let fixture: ComponentFixture<ProfiledetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiledetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
