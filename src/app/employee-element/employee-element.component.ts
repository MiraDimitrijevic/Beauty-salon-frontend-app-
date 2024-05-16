import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee.model';
import { UserModel } from '../user.model';
import { EmployeeService } from '../employee.service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-employee-element',
  templateUrl: './employee-element.component.html',
  styleUrls: ['./employee-element.component.scss'],
})
export class EmployeeElementComponent  implements OnInit , OnDestroy{
  @Input() employee= new EmployeeModel("",new UserModel(0,"","","","employee",""), "","" ,"" );

  constructor( public authService : AuthService,private employeeService: EmployeeService,private serviceService: ServiceService, private router : Router, private appointmentService : AppointmentService) { }
  public alertButtons = ['OK'];
  public message = 'Employee deleted successfully!';
  private messageSub:Subscription=Subscription.EMPTY;
  isAlertOpen=false;
  async presentAlert() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.isAlertOpen = true;
  } 
  ngOnInit() {
    console.log(this.employee.image);
  }

  ngOnDestroy() {
    if(this.messageSub)
    this.messageSub.unsubscribe;
  }

  makeAppointment(){
this.appointmentService.setEmployee(this.employee.id, this.employee.user.name + ' - ' 
  + this.employee.profession, this.employee.image
);
this.router.navigateByUrl('/tabs/services/:serviceId/times');
  }
  

  editSchedule(){

  }
  showOffers(){
   // this.serviceService.setEmployeeOffers(this.employee);
    //this.router.navigateByUrl('tabs/employees/services/:serviceId');
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employee).subscribe((res) =>{
    this.presentAlert();
    })
  }

}
 