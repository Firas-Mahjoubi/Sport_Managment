import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHealthrecordsComponent } from './list-healthrecords.component';

describe('ListHealthrecordsComponent', () => {
  let component: ListHealthrecordsComponent;
  let fixture: ComponentFixture<ListHealthrecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHealthrecordsComponent]
    });
    fixture = TestBed.createComponent(ListHealthrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
