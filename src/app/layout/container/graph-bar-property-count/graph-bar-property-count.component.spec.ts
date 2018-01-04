import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBarPropertyCountComponent } from './graph-bar-property-count.component';

describe('GraphBarPropertyCountComponent', () => {
  let component: GraphBarPropertyCountComponent;
  let fixture: ComponentFixture<GraphBarPropertyCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBarPropertyCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBarPropertyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
