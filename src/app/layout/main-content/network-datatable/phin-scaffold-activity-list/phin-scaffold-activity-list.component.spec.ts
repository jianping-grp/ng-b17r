import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhinScaffoldActivityListComponent } from './phin-scaffold-activity-list.component';

describe('PhinScaffoldActivityListComponent', () => {
  let component: PhinScaffoldActivityListComponent;
  let fixture: ComponentFixture<PhinScaffoldActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhinScaffoldActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhinScaffoldActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
