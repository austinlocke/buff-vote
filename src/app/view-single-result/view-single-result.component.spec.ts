import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleResultComponent } from './view-single-result.component';

describe('ViewSingleResultComponent', () => {
  let component: ViewSingleResultComponent;
  let fixture: ComponentFixture<ViewSingleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
