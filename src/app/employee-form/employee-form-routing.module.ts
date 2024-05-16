import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeFormPage } from './employee-form.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeFormPageRoutingModule {}
