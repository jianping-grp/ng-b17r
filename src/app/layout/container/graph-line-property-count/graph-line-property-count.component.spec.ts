import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphLinePropertyCountComponent } from './graph-line-property-count.component';

describe('GraphLinePropertyCountComponent', () => {
  let component: GraphLinePropertyCountComponent;
  let fixture: ComponentFixture<GraphLinePropertyCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphLinePropertyCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphLinePropertyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
