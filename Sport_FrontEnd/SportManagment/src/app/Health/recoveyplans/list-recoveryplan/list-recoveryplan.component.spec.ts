import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecoveryplanComponent } from './list-recoveryplan.component';

describe('ListRecoveryplanComponent', () => {
  let component: ListRecoveryplanComponent;
  let fixture: ComponentFixture<ListRecoveryplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecoveryplanComponent]
    });
    fixture = TestBed.createComponent(ListRecoveryplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
