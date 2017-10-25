import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetNetworkContainerComponent } from './target-network-container.component';

describe('TargetNetworkContainerComponent', () => {
  let component: TargetNetworkContainerComponent;
  let fixture: ComponentFixture<TargetNetworkContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetNetworkContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetNetworkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
