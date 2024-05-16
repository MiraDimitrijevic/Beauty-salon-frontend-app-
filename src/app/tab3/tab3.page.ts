import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit, OnDestroy {
  dateControl = new FormControl();
  isButtonDisabled: boolean = true;

  dateFormat = 'YYYY-MM-DD';
  minDate = '2024-01-01';
  maxDate = '2024-12-31'; 
times : Date[] =[];

public alertButtons = ['OK'];
public message = '';
public messageSub:Subscription=Subscription.EMPTY;
isAlertOpen=false;
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'No Available Times',
    message: this.message,
    buttons: this.alertButtons,
  });
  await alert.present();
}

async finishAlert() {
  const alert = await this.alertController.create({
    header: 'Important message',
    message: this.message,
    buttons: this.alertButtons,
  });
  await alert.present();
}

  constructor( public appointmentService : AppointmentService, private router:Router, private alertController: AlertController
  ) {}
ngOnInit(){
  this.dateControl.setValue(moment().format('YYYY-MM-DD'));
  this.messageSub=this.appointmentService.message.subscribe((message) =>{
    this.message=message;
  })
}
ngOnDestroy() {
  if(this.messageSub)
  this.messageSub.unsubscribe;
}
onDateChanged(event: any) {
  this.times =[];
  this.isButtonDisabled = true; 
  const selectedDate = event.detail.value; 
  console.log('Date chosen:', selectedDate);
  this.appointmentService.setDate(selectedDate);
  this.appointmentService.getAvailableTimes().subscribe((times) =>{
    this.times = times;
    console.log(this.times);
    console.log(times);
    if (!this.times) {
      this.message = 'There are no available times for the chosen date. Please try another date or check back later.';
      this.presentAlert(); 
    }
  })
}
selectTime(time: Date) {
  this.isButtonDisabled = false; 
  this.appointmentService.setTime(time);

}

addToCard(){
this.appointmentService.addToCard();
this.router.navigateByUrl('tabs/services');
}

makeAppointment(){
  this.appointmentService.addToCard();
  this.appointmentService.createAppointment().subscribe((res) =>{
    this.finishAlert();
    this.router.navigateByUrl('tabs/services');

  });
}
}
