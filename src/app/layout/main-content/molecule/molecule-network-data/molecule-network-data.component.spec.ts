import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeNetworkDataComponent } from './molecule-network-data.component';

describe('MoleculeNetworkDataComponent', () => {
  let component: MoleculeNetworkDataComponent;
  let fixture: ComponentFixture<MoleculeNetworkDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeNetworkDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeNetworkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
