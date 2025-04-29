import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubListComponent } from './club-list.component';

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubListComponent]
    });
    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
