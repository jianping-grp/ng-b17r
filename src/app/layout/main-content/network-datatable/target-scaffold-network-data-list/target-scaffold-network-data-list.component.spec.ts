import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetScaffoldNetworkDataListComponent } from './target-scaffold-network-data-list.component';

describe('TargetScaffoldNetworkDataListComponent', () => {
  let component: TargetScaffoldNetworkDataListComponent;
  let fixture: ComponentFixture<TargetScaffoldNetworkDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetScaffoldNetworkDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetScaffoldNetworkDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
