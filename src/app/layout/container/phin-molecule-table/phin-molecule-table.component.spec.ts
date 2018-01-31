import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhinMoleculeTableComponent } from './phin-molecule-table.component';

describe('PhinMoleculeTableComponent', () => {
  let component: PhinMoleculeTableComponent;
  let fixture: ComponentFixture<PhinMoleculeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhinMoleculeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhinMoleculeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
