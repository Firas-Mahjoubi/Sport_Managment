import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFormComponent } from './club-form.component';

describe('ClubFormComponent', () => {
  let component: ClubFormComponent;
  let fixture: ComponentFixture<ClubFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubFormComponent]
    });
    fixture = TestBed.createComponent(ClubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
