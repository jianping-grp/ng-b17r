import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetActivityTableComponent } from './target-activity-table.component';

describe('TargetActivityTableComponent', () => {
  let component: TargetActivityTableComponent;
  let fixture: ComponentFixture<TargetActivityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetActivityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
