import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfManagerComponent } from './pdf-manager.component';

describe('PdfManagerComponent', () => {
  let component: PdfManagerComponent;
  let fixture: ComponentFixture<PdfManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfManagerComponent]
    });
    fixture = TestBed.createComponent(PdfManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
