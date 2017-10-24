import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JstreeComponent } from './jstree.component';

describe('JstreeComponent', () => {
  let component: JstreeComponent;
  let fixture: ComponentFixture<JstreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JstreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JstreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
