import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticFormComponent } from './tactic-form.component';

describe('TacticFormComponent', () => {
  let component: TacticFormComponent;
  let fixture: ComponentFixture<TacticFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacticFormComponent]
    });
    fixture = TestBed.createComponent(TacticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
