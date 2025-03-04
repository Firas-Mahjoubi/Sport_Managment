import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeListExerciceComponent } from './backoffice-list-exercice.component';

describe('BackofficeListExerciceComponent', () => {
  let component: BackofficeListExerciceComponent;
  let fixture: ComponentFixture<BackofficeListExerciceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackofficeListExerciceComponent]
    });
    fixture = TestBed.createComponent(BackofficeListExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
