import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DocMmpComponent} from "./doc-mmp.component";

describe('DocMmpComponent', () => {
  let component: DocMmpComponent;
  let fixture: ComponentFixture<DocMmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocMmpComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
