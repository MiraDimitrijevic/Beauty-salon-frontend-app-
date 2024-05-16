import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgForm } from '@angular/forms';
import { ServiceModel } from '../service.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.page.html',
  styleUrls: ['./service-form.page.scss'],
})
export class ServiceFormPage implements OnInit,  OnDestroy {
  @Input() service= new ServiceModel(null, "", 0,"", 0,  );
  public alertButtons = ['OK'];
  public message : string | undefined = 'Service saved successfully!';
  public messageSub:Subscription=Subscription.EMPTY;
  constructor(private serviceService: ServiceService,  private router : Router, private alertController: AlertController) { }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Important message',
      message: this.message,
    
      buttons:  [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('tabs/services');
          },
        }]
    });

    await alert.present();
  }
  ngOnInit() {
    this.service=this.serviceService.getService();
    this.messageSub=this.serviceService.messageAlert.subscribe((message) =>{
      this.message=message;
    })
  }
  ngOnDestroy() {
    if(this.messageSub)
    this.messageSub.unsubscribe;
  }
  saveService(form: NgForm){
    this.message = 'Service saved successfully!';
    this.service.cost=form.value.cost;
    this.service.name=form.value.name;
    if(form.value.description=="")
    this.service.description=null;
    else this.service.description=form.value.description;
    this.service.duration=form.value.duration;
    if(this.service.id==null)
    this.serviceService.createService(this.service).subscribe((res)=>{
    this.showAlert();
  

    });
    else this.serviceService.updateService(this.service).subscribe((res)=>{
      this.showAlert();
    });
     
  }

  deleteService(){
    this.serviceService.deleteService(this.service).subscribe((res) =>{
      this.router.navigateByUrl('tabs/services');
    })
  }




}
