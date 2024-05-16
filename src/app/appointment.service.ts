import { Injectable } from '@angular/core';
import { ServiceModel } from './service.model';
import { BehaviorSubject, filter, map, switchMap, take, tap } from 'rxjs';
import { AppointmentModel } from './appointment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ItemModel } from './item.model';
import { DatePipe } from '@angular/common';

//implemnt today appointment
interface AppointmentData{
  id:string;
  date:string;
  start_time:Date;
  end_time:Date;
  items:ItemModel[];
  cost:number;
  };

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointments = new BehaviorSubject<AppointmentModel[]>([]);
  private user_id  : string | null = '0';
  private service_id : string | null = '0';
  private employee_name  : string | null = '';
  private employee_img  : string | null = '';
  private service_name  : string | null = '';
  private service_cost  : number = 0;
  private date = new Date();
  private start_time = new Date();
  private times = new BehaviorSubject<Date[]>([]);
  private items : ItemModel[] =[];
  public itemsObs = new BehaviorSubject< ItemModel[]>([]);
  public dateObs =  new BehaviorSubject< Date>(new Date());;

  public message = new BehaviorSubject<string>('Appointment scheduled successfully!');

  constructor(private http:HttpClient, private authService:AuthService, private datePipe: DatePipe) { }

  getAppointments(){
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.get<{[key:string]:any}>('http://127.0.0.1:8000/api/appointment', { headers: headers });
    }),  map(response => response['appointments']),
    map((appointmentData : AppointmentData[]) =>{
      console.log(appointmentData);
      const appointments:AppointmentModel[]=[];
      for(const key in appointmentData){
        if(appointmentData.hasOwnProperty(key)){
          appointments.push({
            id:appointmentData[key].id,
            date:appointmentData[key].date,
            start_time:appointmentData[key].start_time,
            end_time:appointmentData[key].end_time,
            items:appointmentData[key].items,            
            cost:appointmentData[key].cost
          })
        }
      }
      return appointments;
    }), tap( appointments =>{
      this.appointments.next(appointments);
    }));   
  }

  getAvailableTimes() {
    console.log('empl '+this.user_id);
    console.log('serv '+this.service_id);
    console.log('date '+this.getDate());
    return this.authService.token.pipe(
      take(1), 
      switchMap((token) => {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.http.get<{ filteredTimes: Date[], success: boolean, message: string }>(
          'http://127.0.0.1:8000/api/availableTime/' + this.service_id + '/' + this.user_id + '/' + this.getDate(),
          { headers: headers }
        );
      }),
      tap((response) => {
        console.log(response);
        if (!response.success) {
          console.error('Show message in alert', response.message);
        }
      }),
      map((response) => response.filteredTimes),
      tap((filteredTimes: Date[]) => {
        console.log('Available times:', filteredTimes);
        this.times.next(filteredTimes); // Update your Observable/Subject
      })
    );
  }

  createAppointment(){
    let appointment= new AppointmentModel(null, this.getDate(),new Date(),new Date(),this.items,0);
    console.log(appointment);
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.post<{appointment:AppointmentModel, success:boolean, message:string}>('http://127.0.0.1:8000/api/appointment',appointment, { headers: headers });
    }), take(1), switchMap((response)=>{
      if(response.success==false){
        this.items = [];
        this.itemsObs.next(this.items);
        this.message.next(response.message);
      } else{
      console.log(appointment);
      appointment.cost=response.appointment.cost;
      appointment.id=response.appointment.id;
      appointment.start_time=response.appointment.start_time;
      appointment.end_time=response.appointment.end_time;
    }
  return this.appointments;
   }), take(1), tap((appointments) =>{
      this.appointments.next(appointments.concat(appointment));
      this.items = [];
      this.itemsObs.next(this.items);
     })
);
  }
  
  updateAppointment(appointment:AppointmentModel, cancel:any){
    let appointmentInd:number;
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.put<{ success:boolean, message:string}>('http://127.0.0.1:8000/api/appointment/'+appointment.id,cancel, { headers: headers });
    }), take(1), switchMap((response)=>{
      console.log(response);
      this.message.next(response.message);
      return this.appointments;
   }), take(1), tap((appointments) =>{
    appointmentInd= appointments.findIndex((a)=> {
    return  a.id==appointment.id;
    });
   let appointmentArr= [...appointments];
   appointmentArr.splice(appointmentInd, 1);
   this.appointments.next(appointmentArr);
     })
);
  }

  get appointment() {
    return this.appointments.asObservable();
  }

  public setService(service_id : string | null, service_name: string | null,service_cost: number   ){
    this.service_id = service_id;
    this.service_name = service_name;
    this.service_cost = service_cost;
  }
  public setEmployee(user_id : string | null, employee_name: string | null,employee_img:  string | null){
    this.user_id = user_id;
    this.employee_name = employee_name;
    this.employee_img = employee_img;
  }
  public setTime(time : Date){
    this.start_time = time;
  }

  public setDate(date : Date){
    this.date = date;
    this.dateObs.next(date);
  }

  public getDate(){
   return this.datePipe.transform(this.date, 'yyyy-MM-dd'); 
  }

  addToCard(){
    const item = new ItemModel(null,this.user_id, this.service_id, this.start_time,  this.start_time,
      this.employee_name, this.employee_img, this.service_name, this.service_cost
     );
    this.items.push(item);
    this.itemsObs.next(this.items);

  }

  public getItems (){
    return this.items;
  }

}
