import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePollComponent } from './manage-poll.component';

describe('ManagePollComponent', () => {
  let component: ManagePollComponent;
  let fixture: ComponentFixture<ManagePollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
