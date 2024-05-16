import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeElementComponent } from './employee-element/employee-element.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,  
  ],
  declarations: [
    EmployeeElementComponent,
  ],
  exports: [
    EmployeeElementComponent,
  ]
})
export class EmployeeModuleModule { }
