import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetNetworkTableComponent } from './target-network-table.component';

describe('TargetNetworkTableComponent', () => {
  let component: TargetNetworkTableComponent;
  let fixture: ComponentFixture<TargetNetworkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetNetworkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetNetworkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
