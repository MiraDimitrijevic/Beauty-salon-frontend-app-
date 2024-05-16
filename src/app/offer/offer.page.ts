import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeModel } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { ServiceModel } from '../service.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit, OnDestroy {
  service= new ServiceModel(null, "", 0,"", 0 );
  employees: EmployeeModel[]=[];
private employeesSub:Subscription=Subscription.EMPTY;
  constructor( private employeeService: EmployeeService, private serviceService: EmployeeService, private route: ActivatedRoute) {
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
   this.employeeService.getEmployees().subscribe((employeeData) => {
  console.log(employeeData)
   })

 }



 ionViewDidEnter(){

 }
 ionViewWillLeave(){
   
 }
 ionViewDiidLeave(){
   
 }

}
