import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphScatterLigandComponent } from './graph-scatter-ligand.component';

describe('GraphScatterLigandComponent', () => {
  let component: GraphScatterLigandComponent;
  let fixture: ComponentFixture<GraphScatterLigandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphScatterLigandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphScatterLigandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
