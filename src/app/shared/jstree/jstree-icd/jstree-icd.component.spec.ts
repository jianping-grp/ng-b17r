import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JstreeIcdComponent } from './jstree-icd.component';

describe('JstreeIcdComponent', () => {
  let component: JstreeIcdComponent;
  let fixture: ComponentFixture<JstreeIcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JstreeIcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JstreeIcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
