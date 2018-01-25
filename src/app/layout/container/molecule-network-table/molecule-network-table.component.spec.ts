import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeNetworkTableComponent } from './molecule-network-table.component';

describe('MoleculeNetworkTableComponent', () => {
  let component: MoleculeNetworkTableComponent;
  let fixture: ComponentFixture<MoleculeNetworkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeNetworkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeNetworkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
