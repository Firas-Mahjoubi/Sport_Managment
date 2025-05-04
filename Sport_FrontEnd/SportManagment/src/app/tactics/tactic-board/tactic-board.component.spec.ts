import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticBoardComponent } from './tactic-board.component';

describe('TacticBoardComponent', () => {
  let component: TacticBoardComponent;
  let fixture: ComponentFixture<TacticBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacticBoardComponent]
    });
    fixture = TestBed.createComponent(TacticBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
