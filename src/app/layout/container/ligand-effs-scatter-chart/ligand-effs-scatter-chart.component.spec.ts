import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandEffsScatterChartComponent } from './ligand-effs-scatter-chart.component';

describe('LigandEffsScatterChartComponent', () => {
  let component: LigandEffsScatterChartComponent;
  let fixture: ComponentFixture<LigandEffsScatterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandEffsScatterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandEffsScatterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
