import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetActivityGraphComponent } from './target-activity-graph.component';

describe('TargetActivityGraphComponent', () => {
  let component: TargetActivityGraphComponent;
  let fixture: ComponentFixture<TargetActivityGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetActivityGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetActivityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
