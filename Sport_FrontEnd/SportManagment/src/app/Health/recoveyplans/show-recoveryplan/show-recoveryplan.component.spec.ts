import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecoveryplanComponent } from './show-recoveryplan.component';

describe('ShowRecoveryplanComponent', () => {
  let component: ShowRecoveryplanComponent;
  let fixture: ComponentFixture<ShowRecoveryplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRecoveryplanComponent]
    });
    fixture = TestBed.createComponent(ShowRecoveryplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
