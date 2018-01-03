import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldDetailComponent } from './scaffold-detail.component';

describe('ScaffoldDetailComponent', () => {
  let component: ScaffoldDetailComponent;
  let fixture: ComponentFixture<ScaffoldDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
