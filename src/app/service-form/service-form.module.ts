import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceFormPageRoutingModule } from './service-form-routing.module';

import { ServiceFormPage } from './service-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceFormPageRoutingModule
  ],
  declarations: [ServiceFormPage]
})
export class ServiceFormPageModule {}
