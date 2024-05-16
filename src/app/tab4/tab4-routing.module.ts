import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'offer/:employeeId',
    //Services with checkboxes
    loadChildren: () => import('../offer/offer.module').then( m => m.OfferPageModule)
  },
  {
    path: 'schedule/:employeeId',
    //Schedule load, add calendar (possibly ion-calendar)
    loadChildren: () => import('../service-form/service-form.module').then( m => m.ServiceFormPageModule)
  },
  {
    //new employee form, similar to register form
    //add image upload
    path: 'employee',
    loadChildren: () => import('../employee-form/employee-form.module').then( m => m.EmployeeFormPageModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
