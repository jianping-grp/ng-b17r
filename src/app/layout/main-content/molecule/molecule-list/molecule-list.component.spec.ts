import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeListComponent } from './molecule-list.component';

describe('MoleculeListComponent', () => {
  let component: MoleculeListComponent;
  let fixture: ComponentFixture<MoleculeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
