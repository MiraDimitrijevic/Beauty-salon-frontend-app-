import { Component, Input, OnInit } from '@angular/core';
import { ServiceModel } from '../service.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { ServiceService } from '../service.service';
import { AppointmentService } from '../appointment.service';


@Component({
  selector: 'app-service-element',
  templateUrl: './service-element.component.html',
  styleUrls: ['./service-element.component.scss'],
})
export class ServiceElementComponent  implements OnInit {
  @Input() service= new ServiceModel(null, "", 0,"", 0,  );
  constructor( public authService : AuthService,private employeeService: EmployeeService,private serviceService: ServiceService, private router : Router,private appointmentService: AppointmentService ) { }
 
  showOffers(){
  console.log(this.service.id);
  this.appointmentService.setService(this.service.id, this.service.name, this.service.cost);
  this.employeeService.setServiceOffers(this.service);
  this.router.navigateByUrl('tabs/services/:serviceId');
}


editService(){
  console.log(this.service.id);
  this.serviceService.setService(this.service);
  this.router.navigateByUrl('tabs/services/service/:serviceId');
}

  ngOnInit() {
    console.log(this.service.id);
    this.employeeService.setServiceOffers(this.service);
  }

}
