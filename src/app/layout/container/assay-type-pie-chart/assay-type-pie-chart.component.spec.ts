import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayTypePieChartComponent } from './assay-type-pie-chart.component';

describe('AssayTypePieChartComponent', () => {
  let component: AssayTypePieChartComponent;
  let fixture: ComponentFixture<AssayTypePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssayTypePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayTypePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
