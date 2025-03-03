import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesmainComponent } from './matchesmain.component';

describe('MatchesmainComponent', () => {
  let component: MatchesmainComponent;
  let fixture: ComponentFixture<MatchesmainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesmainComponent]
    });
    fixture = TestBed.createComponent(MatchesmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
