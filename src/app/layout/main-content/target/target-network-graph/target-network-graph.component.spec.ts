import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetNetworkGraphComponent } from './target-network-graph.component';

describe('TargetNetworkGraphComponent', () => {
  let component: TargetNetworkGraphComponent;
  let fixture: ComponentFixture<TargetNetworkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetNetworkGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
