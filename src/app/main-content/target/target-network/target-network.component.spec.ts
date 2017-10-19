import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetNetworkComponent } from './target-network.component';

describe('TargetNetworkComponent', () => {
  let component: TargetNetworkComponent;
  let fixture: ComponentFixture<TargetNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
