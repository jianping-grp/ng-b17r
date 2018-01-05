import {AssayActivityTableComponent} from "./doc-activity-table.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

describe('AssayActivityTableComponent', () => {
  let component: AssayActivityTableComponent;
  let fixture: ComponentFixture<AssayActivityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssayActivityTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture => TestBed.createComponent(AssayActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
