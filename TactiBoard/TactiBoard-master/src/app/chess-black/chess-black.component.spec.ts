import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessBlackComponent } from './chess-black.component';

describe('ChessBlackComponent', () => {
  let component: ChessBlackComponent;
  let fixture: ComponentFixture<ChessBlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessBlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
