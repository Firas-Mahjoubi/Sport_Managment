import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHealthrecordComponent } from './edit-healthrecord.component';

describe('EditHealthrecordComponent', () => {
  let component: EditHealthrecordComponent;
  let fixture: ComponentFixture<EditHealthrecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHealthrecordComponent]
    });
    fixture = TestBed.createComponent(EditHealthrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
