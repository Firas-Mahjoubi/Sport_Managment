import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryAddComponent } from './injury-add.component';

describe('InjuryAddComponent', () => {
  let component: InjuryAddComponent;
  let fixture: ComponentFixture<InjuryAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InjuryAddComponent]
    });
    fixture = TestBed.createComponent(InjuryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
