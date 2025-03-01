import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInjuryArchiveComponent } from './list-injury-archive.component';

describe('ListInjuryArchiveComponent', () => {
  let component: ListInjuryArchiveComponent;
  let fixture: ComponentFixture<ListInjuryArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInjuryArchiveComponent]
    });
    fixture = TestBed.createComponent(ListInjuryArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
