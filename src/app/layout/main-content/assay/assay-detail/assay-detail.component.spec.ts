import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayDetailComponent } from './assay-detail.component';

describe('AssayDetailComponent', () => {
  let component: AssayDetailComponent;
  let fixture: ComponentFixture<AssayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
