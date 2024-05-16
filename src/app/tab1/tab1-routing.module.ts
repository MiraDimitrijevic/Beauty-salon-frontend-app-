import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: ':serviceId',
    loadChildren: () => import('../offer/offer.module').then( m => m.OfferPageModule)
  },
  {
    path: 'service/:serviceId',
    loadChildren: () => import('../service-form/service-form.module').then( m => m.ServiceFormPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
