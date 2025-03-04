import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesNavbarComponent } from './matches-navbar.component';

describe('MatchesNavbarComponent', () => {
  let component: MatchesNavbarComponent;
  let fixture: ComponentFixture<MatchesNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesNavbarComponent]
    });
    fixture = TestBed.createComponent(MatchesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
