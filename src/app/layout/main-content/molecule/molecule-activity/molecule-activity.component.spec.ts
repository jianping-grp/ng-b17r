import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeActivityComponent } from './molecule-activity.component';

describe('MoleculeActivityComponent', () => {
  let component: MoleculeActivityComponent;
  let fixture: ComponentFixture<MoleculeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
