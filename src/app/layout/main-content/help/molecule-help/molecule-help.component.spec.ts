import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeHelpComponent } from './molecule-help.component';

describe('MoleculeHelpComponent', () => {
  let component: MoleculeHelpComponent;
  let fixture: ComponentFixture<MoleculeHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
