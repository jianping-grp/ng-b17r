import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDetailComponent } from './target-detail.component';

describe('TargetDetailComponent', () => {
  let component: TargetDetailComponent;
  let fixture: ComponentFixture<TargetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
