import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTacticDialogComponent } from './create-tactic-dialog.component';

describe('CreateTacticDialogComponent', () => {
  let component: CreateTacticDialogComponent;
  let fixture: ComponentFixture<CreateTacticDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTacticDialogComponent]
    });
    fixture = TestBed.createComponent(CreateTacticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
