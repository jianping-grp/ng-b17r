import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetScaffoldComponent } from './target-scaffold.component';

describe('TargetScaffoldComponent', () => {
  let component: TargetScaffoldComponent;
  let fixture: ComponentFixture<TargetScaffoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetScaffoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetScaffoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
