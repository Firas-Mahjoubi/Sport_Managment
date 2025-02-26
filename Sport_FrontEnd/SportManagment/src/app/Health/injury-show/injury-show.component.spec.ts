import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryShowComponent } from './injury-show.component';

describe('InjuryShowComponent', () => {
  let component: InjuryShowComponent;
  let fixture: ComponentFixture<InjuryShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InjuryShowComponent]
    });
    fixture = TestBed.createComponent(InjuryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
