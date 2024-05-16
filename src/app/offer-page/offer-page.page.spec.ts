import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferPagePage } from './offer-page.page';

describe('OfferPagePage', () => {
  let component: OfferPagePage;
  let fixture: ComponentFixture<OfferPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OfferPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
