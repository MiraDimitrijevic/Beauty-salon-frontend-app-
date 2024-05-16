import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { EmployeeModel } from '../employee.model';
import { UserModel } from '../user.model';
import { PhotoServiceService } from '../photo-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.page.html',
  styleUrls: ['./employee-form.page.scss'],
})
export class EmployeeFormPage implements OnInit, OnDestroy {
  public alertButtons = ['OK'];
  public message = 'Employee created successfully!';
  private messageSub:Subscription=Subscription.EMPTY;
  private employee =new EmployeeModel(null, new UserModel(0,'','','',"employee",''),'' ,"",""  ) ;
  constructor(private employeeService: EmployeeService,  private router : Router, public photoService: PhotoServiceService, private alertController: AlertController) { }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Important message',
      message: this.message,
      buttons: this.alertButtons,
    });
    await alert.present();
  }
  ngOnInit() {
    this.messageSub=this.employeeService.message.subscribe((message) =>{
      this.message=message;
    })
  }
  ngOnDestroy() {
    if(this.messageSub)
    this.messageSub.unsubscribe;
  }

  newEmployee(form: NgForm){
this.employee.user.name =form.value.name;
this.employee.user.email =form.value.email;
this.employee.user.password =form.value.password;
this.employee.profession =form.value.profession;
this.employee.image =this.photoService.photo.data;
console.log(this.photoService.photo.data);
this.employee.file_name =this.photoService.photo.filepath;
this.employeeService.createEmployee(this.employee).subscribe((res)=>{
  console.log(res);
  this.presentAlert();
form.resetForm();
this.router.navigateByUrl('tabs/employees');
});


  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
