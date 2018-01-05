import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundCardComponent } from './compound-card.component';

describe('CompoundCardComponent', () => {
  let component: CompoundCardComponent;
  let fixture: ComponentFixture<CompoundCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
