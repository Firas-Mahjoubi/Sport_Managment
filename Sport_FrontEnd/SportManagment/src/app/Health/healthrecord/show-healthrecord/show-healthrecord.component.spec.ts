import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHealthrecordComponent } from './show-healthrecord.component';

describe('ShowHealthrecordComponent', () => {
  let component: ShowHealthrecordComponent;
  let fixture: ComponentFixture<ShowHealthrecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowHealthrecordComponent]
    });
    fixture = TestBed.createComponent(ShowHealthrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
