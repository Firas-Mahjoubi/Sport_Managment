import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPlayerQrComponent } from './public-player-qr.component';

describe('PublicPlayerQrComponent', () => {
  let component: PublicPlayerQrComponent;
  let fixture: ComponentFixture<PublicPlayerQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicPlayerQrComponent]
    });
    fixture = TestBed.createComponent(PublicPlayerQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
