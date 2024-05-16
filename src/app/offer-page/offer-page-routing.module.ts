import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferPagePage } from './offer-page.page';

const routes: Routes = [
  {
    path: '',
    component: OfferPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferPagePageRoutingModule {}
