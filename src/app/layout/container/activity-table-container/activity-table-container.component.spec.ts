import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTableContainerComponent } from './activity-table-container.component';

describe('ActivityTableContainerComponent', () => {
  let component: ActivityTableContainerComponent;
  let fixture: ComponentFixture<ActivityTableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTableContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
