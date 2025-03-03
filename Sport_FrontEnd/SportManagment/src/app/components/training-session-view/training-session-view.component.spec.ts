import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSessionViewComponent } from './training-session-view.component';

describe('TrainingSessionViewComponent', () => {
  let component: TrainingSessionViewComponent;
  let fixture: ComponentFixture<TrainingSessionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingSessionViewComponent]
    });
    fixture = TestBed.createComponent(TrainingSessionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
