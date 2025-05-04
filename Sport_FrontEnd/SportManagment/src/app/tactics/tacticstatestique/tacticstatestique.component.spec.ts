import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticstatestiqueComponent } from './tacticstatestique.component';

describe('TacticstatestiqueComponent', () => {
  let component: TacticstatestiqueComponent;
  let fixture: ComponentFixture<TacticstatestiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacticstatestiqueComponent]
    });
    fixture = TestBed.createComponent(TacticstatestiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
