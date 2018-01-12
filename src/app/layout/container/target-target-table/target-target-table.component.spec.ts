import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTargetTableComponent } from './target-target-table.component';

describe('TargetTargetTableComponent', () => {
  let component: TargetTargetTableComponent;
  let fixture: ComponentFixture<TargetTargetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetTargetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTargetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
