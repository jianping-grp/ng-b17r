import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayHelpComponent } from './assay-help.component';

describe('AssayHelpComponent', () => {
  let component: AssayHelpComponent;
  let fixture: ComponentFixture<AssayHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssayHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
