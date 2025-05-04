import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubsComponent } from './public-clubs.component';

describe('PublicClubsComponent', () => {
  let component: PublicClubsComponent;
  let fixture: ComponentFixture<PublicClubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicClubsComponent]
    });
    fixture = TestBed.createComponent(PublicClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
