import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticFolderComponent } from './tactic-folder.component';

describe('TacticFolderComponent', () => {
  let component: TacticFolderComponent;
  let fixture: ComponentFixture<TacticFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacticFolderComponent]
    });
    fixture = TestBed.createComponent(TacticFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
