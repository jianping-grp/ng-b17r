import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetHelpComponent } from './target-help.component';

describe('TargetHelpComponent', () => {
  let component: TargetHelpComponent;
  let fixture: ComponentFixture<TargetHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
