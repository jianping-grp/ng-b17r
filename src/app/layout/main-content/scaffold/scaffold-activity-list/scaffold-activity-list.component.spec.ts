import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldActivityListComponent } from './scaffold-activity-list.component';

describe('ScaffoldActivityListComponent', () => {
  let component: ScaffoldActivityListComponent;
  let fixture: ComponentFixture<ScaffoldActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
