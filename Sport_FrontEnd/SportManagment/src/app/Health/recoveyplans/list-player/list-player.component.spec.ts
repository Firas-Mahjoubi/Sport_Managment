import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlayerComponent } from './list-player.component';

describe('ListPlayerComponent', () => {
  let component: ListPlayerComponent;
  let fixture: ComponentFixture<ListPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlayerComponent]
    });
    fixture = TestBed.createComponent(ListPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
