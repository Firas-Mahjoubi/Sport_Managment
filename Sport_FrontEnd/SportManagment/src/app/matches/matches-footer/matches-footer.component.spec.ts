import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesFooterComponent } from './matches-footer.component';

describe('MatchesFooterComponent', () => {
  let component: MatchesFooterComponent;
  let fixture: ComponentFixture<MatchesFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesFooterComponent]
    });
    fixture = TestBed.createComponent(MatchesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
