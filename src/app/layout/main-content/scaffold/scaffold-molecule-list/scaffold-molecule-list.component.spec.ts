import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldMoleculeListComponent } from './scaffold-molecule-list.component';

describe('ScaffoldMoleculeListComponent', () => {
  let component: ScaffoldMoleculeListComponent;
  let fixture: ComponentFixture<ScaffoldMoleculeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldMoleculeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldMoleculeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
