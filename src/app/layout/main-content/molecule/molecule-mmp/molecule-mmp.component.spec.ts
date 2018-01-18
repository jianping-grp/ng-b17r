import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeMmpComponent } from './molecule-mmp.component';

describe('MoleculeMmpComponent', () => {
  let component: MoleculeMmpComponent;
  let fixture: ComponentFixture<MoleculeMmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoleculeMmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeMmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
