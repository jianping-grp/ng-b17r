import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsmeComponent } from './jsme.component';

describe('JsmeComponent', () => {
  let component: JsmeComponent;
  let fixture: ComponentFixture<JsmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
