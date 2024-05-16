import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.page.html',
  styleUrls: ['./offer-page.page.scss'],
})
export class OfferPagePage implements OnInit , OnDestroy {
  @Input() items= this.appointmentServ.getItems();
  date = new Date();
  constructor(private appointmentServ : AppointmentService , private router:Router, private alertController: AlertController) { }
  public alertButtons = ['OK'];
  public message = 'Appointment scheduled successfully!';
  public messageSub:Subscription=Subscription.EMPTY;
  async finishAlert() {
    const alert = await this.alertController.create({
      header: 'Important message',
      message: this.message,
      buttons: this.alertButtons,
    });
    await alert.present();
  }

  ngOnInit() {
    this.messageSub=this.appointmentServ.message.subscribe((message) =>{
      this.message=message;
    })
    this.appointmentServ.itemsObs.subscribe((items) =>{
      this.items=items;
    })
    this.appointmentServ.dateObs.subscribe((date) =>{
      this.date=date;
    })
  }
  ngOnDestroy() {
    if(this.messageSub)
    this.messageSub.unsubscribe;
  }
  makeAppointment(){
    this.appointmentServ.createAppointment().subscribe((res) =>{
      this.finishAlert();
      this.router.navigateByUrl('tabs/services');
  
    });
  }

}
