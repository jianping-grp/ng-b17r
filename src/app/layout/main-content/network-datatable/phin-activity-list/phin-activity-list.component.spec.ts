import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhinActivityListComponent } from './phin-activity-list.component';

describe('PhinActivityListComponent', () => {
  let component: PhinActivityListComponent;
  let fixture: ComponentFixture<PhinActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhinActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhinActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
