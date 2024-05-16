import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public alertButtons = ['OK'];
  public message = '';
 
  constructor(private router:Router, private service:AuthService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Important message',
      message: this.message,
      buttons: this.alertButtons,
    });
    await alert.present();
  }
  register(form: NgForm) {
    this.service.register(form.value).subscribe(
      resData => {
        console.log("Registration response:", resData);
        if (resData.success === true) {
          this.message = 'You have successfully registered!';
          this.presentAlert();
          form.resetForm();
          this.router.navigateByUrl('login');
        }
        else{
          this.message = 'Error: ';
          if(resData.error.email){
            this.message+=resData.error.email[0];
          }
          if(resData.error.password){
            this.message+=resData.error.password[0];
          }
          if(resData.error.contact){
            this.message+=resData.error.contact[0];
          }
          this.presentAlert();
          form.resetForm();

        }
      },
      error => {
        console.log("Registration error:", error);
      }
    );
  }
  
  openLogInPage(){
this.router.navigateByUrl('login');
  }

}