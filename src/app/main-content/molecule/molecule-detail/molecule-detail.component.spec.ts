import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeDetailComponent } from './molecule-detail.component';

describe('MoleculeDetailComponent', () => {
  let component: MoleculeDetailComponent;
  let fixture: ComponentFixture<MoleculeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
