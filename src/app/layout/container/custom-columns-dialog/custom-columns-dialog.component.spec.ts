import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColumnsDialogComponent } from './custom-columns-dialog.component';

describe('CustomColumnsDialogComponent', () => {
  let component: CustomColumnsDialogComponent;
  let fixture: ComponentFixture<CustomColumnsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomColumnsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColumnsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
