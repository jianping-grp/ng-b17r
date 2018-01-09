import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeGraphComponent } from './molecule-graph.component';

describe('MoleculeGraphComponent', () => {
  let component: MoleculeGraphComponent;
  let fixture: ComponentFixture<MoleculeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
