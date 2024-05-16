import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ServiceModel } from '../service.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  services: ServiceModel[]=[];
private servicesSub:Subscription=Subscription.EMPTY;
  constructor( private serviceService: ServiceService, public authService:AuthService, private router : Router) {
  }

 ngOnInit() {
   this.servicesSub=this.serviceService.service.subscribe((services) =>{
     this.services=services;
   })
 }

 
 ngOnDestroy() {
   if(this.servicesSub)
   this.servicesSub.unsubscribe;
 }

 ionViewWillEnter(){
   this.serviceService.getServices("").subscribe((serviceData) => {
  
   })

 }

 handleInput(event:any) {
  const name = event.target.value.toLowerCase();
  this.serviceService.getServices(name).subscribe((serviceData) => {
  
  })
}
create(){
  this.router.navigateByUrl('tabs/services/service/0');
}

 ionViewDidEnter(){

 }
 ionViewWillLeave(){
   
 }
 ionViewDiidLeave(){
   
 }

}
