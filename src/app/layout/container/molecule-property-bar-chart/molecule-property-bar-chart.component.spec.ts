import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculePropertyBarChartComponent } from './molecule-property-bar-chart.component';

describe('MoleculePropertyBarChartComponent', () => {
  let component: MoleculePropertyBarChartComponent;
  let fixture: ComponentFixture<MoleculePropertyBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculePropertyBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculePropertyBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
