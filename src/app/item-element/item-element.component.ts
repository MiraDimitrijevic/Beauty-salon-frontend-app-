import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ItemModel } from '../item.model';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-item-element',
  templateUrl: './item-element.component.html',
  styleUrls: ['./item-element.component.scss'],
})
export class ItemElementComponent  implements OnInit {
  @Input() item = new ItemModel(null,null, null, new Date(),  new Date(), null, null, null, 0);

  constructor(public authService : AuthService, private appointmentService: AppointmentService) { }

  deleteItem(){

  }
  ngOnInit() {}

}
