import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferPagePageRoutingModule } from './offer-page-routing.module';

import { OfferPagePage } from './offer-page.page';
import { ItemElementComponent } from '../item-element/item-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferPagePageRoutingModule
  ],
  declarations: [OfferPagePage, ItemElementComponent]
})
export class OfferPagePageModule {}
