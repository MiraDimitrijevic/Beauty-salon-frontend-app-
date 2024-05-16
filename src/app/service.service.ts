import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject, EMPTY, Observable, map, switchMap, take, tap } from 'rxjs';
import { ServiceModel } from './service.model';
import { Token } from '@angular/compiler';
 


interface ServiceData{
  id:string;
  name:string;
  description:string;
  duration:number;
  cost:number;
  };
 
  @Injectable({
    providedIn: 'root'
  })

export class ServiceService {
  private services = new BehaviorSubject<ServiceModel[]>([]);
  private message = new BehaviorSubject<string>('Service saved successfully!');
  private serviceEdit :ServiceModel=new ServiceModel(null, "", 0,"", 0  ) ;

  constructor(private http:HttpClient, private authService:AuthService) { }
 
  getServices(name:string){
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.get<{[key:string]:any}>('http://127.0.0.1:8000/api/service/?max_price=70000&min_price=0&name='+name, { headers: headers });
    }),  map(response => response['services']),
    map((serviceData : ServiceData[]) =>{
      console.log(serviceData);
      const services:ServiceModel[]=[];
      for(const key in serviceData){
        if(serviceData.hasOwnProperty(key)){
          services.push({
            id:serviceData[key].id,
            name:serviceData[key].name,
            description:serviceData[key].description,
            duration:serviceData[key].duration,
            cost:serviceData[key].cost
          })
        }
      }
      return services;
    }), tap( services =>{
      this.services.next(services);
    }));   
  }

  createService(service:ServiceModel){
    console.log(service);
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.post<{serviceId:string, success:boolean, error:any}>('http://127.0.0.1:8000/api/service',service, { headers: headers });
    }), take(1), switchMap((response)=>{
      if(response.success==false){
        const keys = Object.keys(response.error);
        const propertyName = keys[0]; 
        this.message.next(response.error[propertyName][0]);
        return EMPTY;
      }
      this.serviceEdit.id = response.serviceId;
  return this.services;
   }), take(1), tap((services) =>{
      this.services.next(services.concat(this.serviceEdit));
      this.serviceEdit = new ServiceModel(null, "", 0,"", 0  ) ;

     })
);
  }

  updateService(service:ServiceModel){
    let serviceInd:number;
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.put<{ success:boolean, error:any}>('http://127.0.0.1:8000/api/service/'+service.id,service, { headers: headers });
    }), take(1), switchMap((response)=>{
      if(response.success==false){
        const keys = Object.keys(response.error);
        const propertyName = keys[0]; 
        this.message.next(response.error[propertyName][0]);
      }
  return this.services;
   }), take(1), tap((services) =>{
    serviceInd= services.findIndex((s)=> {
      return s.id===service.id;
    });
   let serviceArr= [...services];
   const serv=serviceArr[serviceInd];
   serviceArr[serviceInd]= service;
   this.services.next(serviceArr);
  this.serviceEdit = new ServiceModel(null, "", 0,"", 0  ) ;

     })
);
  }
  deleteService(service:ServiceModel){
    let serviceInd:number;
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.delete<{ success:boolean}>('http://127.0.0.1:8000/api/service/'+service.id, { headers: headers });
    }), take(1), switchMap((response)=>{
  return this.services;
   }), take(1), tap((services) =>{
    serviceInd= services.findIndex((s)=> {
      s.id===service.id;
    });
   let serviceArr= [...services];
   serviceArr.splice(serviceInd, 1);
   this.services.next(serviceArr);
  this.serviceEdit = new ServiceModel(null, "", 0,"", 0  ) ;

     })
);
  }
  get service() {
    return this.services.asObservable();
  }

  get messageAlert(){
    return this.message.asObservable();
  }

  public setService(aervice : ServiceModel){
    this.serviceEdit = aervice;
  }

  public setMessage(message : string){
    this.message.next(message);
  }

  public getService(){
    return this.serviceEdit;
  }

  public getMessage() {
    return this.message;
  }
}
