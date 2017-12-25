import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmpTableComponent } from './mmp-table.component';

describe('MmpTableComponent', () => {
  let component: MmpTableComponent;
  let fixture: ComponentFixture<MmpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
