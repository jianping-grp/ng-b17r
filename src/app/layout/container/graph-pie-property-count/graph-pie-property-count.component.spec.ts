import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPiePropertyCountComponent } from './graph-pie-property-count.component';

describe('GraphPiePropertyCountComponent', () => {
  let component: GraphPiePropertyCountComponent;
  let fixture: ComponentFixture<GraphPiePropertyCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPiePropertyCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPiePropertyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
