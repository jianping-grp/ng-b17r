import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTimeLineChartComponent } from './document-time-line-chart.component';

describe('DocumentTimeLineChartComponent', () => {
  let component: DocumentTimeLineChartComponent;
  let fixture: ComponentFixture<DocumentTimeLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTimeLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTimeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
