import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypePieChartComponent } from './activity-type-pie-chart.component';

describe('ActivityTypePieChartComponent', () => {
  let component: ActivityTypePieChartComponent;
  let fixture: ComponentFixture<ActivityTypePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
