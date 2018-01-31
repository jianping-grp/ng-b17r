import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhinMoleculeListComponent } from './phin-molecule-list.component';

describe('PhinMoleculeListComponent', () => {
  let component: PhinMoleculeListComponent;
  let fixture: ComponentFixture<PhinMoleculeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhinMoleculeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhinMoleculeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
