import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTargetScaffoldTableComponent } from './target-target-scaffold-table.component';

describe('TargetTargetScaffoldTableComponent', () => {
  let component: TargetTargetScaffoldTableComponent;
  let fixture: ComponentFixture<TargetTargetScaffoldTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetTargetScaffoldTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTargetScaffoldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
