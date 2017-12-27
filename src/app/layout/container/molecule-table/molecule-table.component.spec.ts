import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeTableComponent } from './molecule-table.component';

describe('MoleculeTableComponent', () => {
  let component: MoleculeTableComponent;
  let fixture: ComponentFixture<MoleculeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
