import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetScaffoldNetworkTableComponent } from './target-scaffold-network-table.component';

describe('TargetScaffoldNetworkTableComponent', () => {
  let component: TargetScaffoldNetworkTableComponent;
  let fixture: ComponentFixture<TargetScaffoldNetworkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetScaffoldNetworkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetScaffoldNetworkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
