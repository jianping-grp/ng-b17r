import {DocActivityTableComponent} from "./doc-activity-table.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

describe('DocActivityTableComponent', () => {
  let component: DocActivityTableComponent;
  let fixture: ComponentFixture<DocActivityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocActivityTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture => TestBed.createComponent(DocActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
