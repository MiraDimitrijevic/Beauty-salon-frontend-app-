import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferPageRoutingModule } from './offer-routing.module';

import { OfferPage } from './offer.page';
import { EmployeeElementComponent } from '../employee-element/employee-element.component';
import { EmployeeModuleModule } from '../employee-module.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferPageRoutingModule,
    EmployeeModuleModule
  ],
  declarations: [OfferPage]
})
export class OfferPageModule {}
