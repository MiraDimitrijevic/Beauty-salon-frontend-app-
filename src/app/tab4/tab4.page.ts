import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit,OnDestroy  {
  employees: EmployeeModel[]=[];
private employeesSub:Subscription=Subscription.EMPTY;
  constructor( private employeeService: EmployeeService,  private router : Router) {
  }

 ngOnInit() {
   this.employeesSub=this.employeeService.employee.subscribe((employees) =>{
     this.employees=employees;
     console.log(employees);
   })
 }

 
 ngOnDestroy() {
   if(this.employeesSub)
   this.employeesSub.unsubscribe;
 }

 ionViewWillEnter(){
   this.employeeService.getAllEmployees().subscribe((employeeData) => {
  console.log(employeeData)
   })
  }

  create(){
    this.router.navigateByUrl('tabs/employees/employee');
  }

}
