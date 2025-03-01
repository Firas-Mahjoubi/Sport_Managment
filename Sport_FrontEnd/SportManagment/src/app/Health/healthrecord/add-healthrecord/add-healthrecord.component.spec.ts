import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthrecordComponent } from './add-healthrecord.component';

describe('AddHealthrecordComponent', () => {
  let component: AddHealthrecordComponent;
  let fixture: ComponentFixture<AddHealthrecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHealthrecordComponent]
    });
    fixture = TestBed.createComponent(AddHealthrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
