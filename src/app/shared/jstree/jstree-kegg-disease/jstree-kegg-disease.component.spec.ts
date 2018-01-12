import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JstreeKeggDiseaseComponent } from './jstree-kegg-disease.component';

describe('JstreeKeggDiseaseComponent', () => {
  let component: JstreeKeggDiseaseComponent;
  let fixture: ComponentFixture<JstreeKeggDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JstreeKeggDiseaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JstreeKeggDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
