import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentModel } from '../appointment.model';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy{

  appointments: AppointmentModel[]=[];
private appointmentsSub:Subscription=Subscription.EMPTY;
  constructor( private appointmentService: AppointmentService) {
  }

 ngOnInit() {
   this.appointmentsSub=this.appointmentService.appointment.subscribe((appointments) =>{
     this.appointments=appointments;
   })
 }

 
 ngOnDestroy() {
   if(this.appointmentsSub)
   this.appointmentsSub.unsubscribe;
 }

 ionViewWillEnter(){
   this.appointmentService.getAppointments().subscribe((appointmentsData) => {
  
   })

 }



 ionViewDidEnter(){

 }
 ionViewWillLeave(){
   
 }
 ionViewDiidLeave(){
   
 }


}
