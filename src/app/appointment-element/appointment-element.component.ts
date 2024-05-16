import { Component, Input, OnInit } from '@angular/core';
import { AppointmentModel } from '../appointment.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-element',
  templateUrl: './appointment-element.component.html',
  styleUrls: ['./appointment-element.component.scss'],
})
export class AppointmentElementComponent  implements OnInit {
  @Input() appointment= new AppointmentModel(null, '', new Date(),new Date(), [], 0 );

  formattedDate: string | null =null;
  cancel={'canceled': false, 'cancellation_reason':''};

  constructor(private datePipe: DatePipe, public authService : AuthService,private alertController: AlertController, private appointmentService : AppointmentService) {
  }
  async showConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm cancelation',
      message: 'Please provide us with your cancelation reason.',
      inputs: [
        {
          name: 'confirmText',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirm',
          handler: (data) => {
          this.cancel.cancellation_reason  = data.confirmText;
          this.cancel.canceled = true;
          this.appointmentService.updateAppointment(this.appointment, this.cancel).subscribe((res)=>{
          });
                  },
        },
      ],
    });

    await alert.present();
  }
  transformDate(date: any): string | null {
    console.log(date);
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }
  ngOnInit() {
    this.formattedDate = this.transformDate(this.appointment.date);

  }
 
}
