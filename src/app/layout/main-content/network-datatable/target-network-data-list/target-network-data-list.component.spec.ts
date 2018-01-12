import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetNetworkDataListComponent } from './target-network-data-list.component';

describe('TargetNetworkDataListComponent', () => {
  let component: TargetNetworkDataListComponent;
  let fixture: ComponentFixture<TargetNetworkDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetNetworkDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetNetworkDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
