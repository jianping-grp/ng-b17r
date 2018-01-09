import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldTableComponent } from './scaffold-table.component';

describe('ScaffoldTableComponent', () => {
  let component: ScaffoldTableComponent;
  let fixture: ComponentFixture<ScaffoldTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
