import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessWhiteComponent } from './chess-white.component';

describe('ChessWhiteComponent', () => {
  let component: ChessWhiteComponent;
  let fixture: ComponentFixture<ChessWhiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessWhiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
