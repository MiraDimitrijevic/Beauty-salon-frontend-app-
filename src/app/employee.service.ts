import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { EmployeeModel } from './employee.model';
import { UserModel } from './user.model';
import { ServiceModel } from './service.model';

interface EmployeeData{
  user:UserModel;
  profession:string;
  image:string;
  file_name:string;
  };

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = new BehaviorSubject<EmployeeModel[]>([]);
  private serviceOffers :ServiceModel=new ServiceModel(null, "", 0,"", 0,  ) ;
  private newEmployee :EmployeeModel  =new EmployeeModel(null, new UserModel(0,'','','',"employee",''),'' ,"" ,'') ;
  public message = new BehaviorSubject<string>('Employee created successfully!');

  constructor(private http:HttpClient, private authService:AuthService) { }

  getEmployees(){
   const serviceId = this.serviceOffers.id;
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.get<{[key:string]:any}>('http://127.0.0.1:8000/api/offer?service_id=' +serviceId, { headers: headers });
    }),  map(response => response['employees']),
    map((employeeData : EmployeeData[]) =>{
      console.log(employeeData);
      const employees:EmployeeModel[]=[];
      for(const key in employeeData){
          employees.push({
            id:employeeData[key].user.id.toString(),
            user:employeeData[key].user,
            profession:employeeData[key].profession,
            image: `data:image/png;base64,${employeeData[key].image}`,
            file_name:employeeData[key].file_name
          })
        
      }
      return employees;
    }), tap( employees =>{
      console.log(employees);
      this.employees.next(employees);
    }));   
  }

  getAllEmployees(){
     return this.authService.token.pipe(take(1), switchMap((token) =>{
       const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
       return this.http.get<{[key:string]:any}>('http://127.0.0.1:8000/api/employee' , { headers: headers });
     }),  map(response => response['employees']),
     map((employeeData : EmployeeData[]) =>{
       console.log(employeeData);
       const employees:EmployeeModel[]=[];
       for(const key in employeeData){
           employees.push({
             id:employeeData[key].user.id.toString(),
             user:employeeData[key].user,
             profession:employeeData[key].profession,
             image: `data:image/png;base64,${employeeData[key].image}`,
             file_name:employeeData[key].file_name       
           })
         console.log(`data:image/png;base64,${employeeData[key].image}`);
       }
       return employees;
     }), tap( employees =>{
       console.log(employees);
       this.employees.next(employees);
     }));   
   }
  get employee() {
    return this.employees.asObservable();
  }

  public setServiceOffers(aervice : ServiceModel){
    this.serviceOffers = aervice;
  }

  public getServiceOffers(){
    return this.serviceOffers;
  }

  deleteEmployee(employee: EmployeeModel){
    let employeeInd:number;
    console.log(employee.id);
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.delete<{ success:boolean}>('http://127.0.0.1:8000/api/employee/'+employee.id, { headers: headers });
    }), take(1), switchMap((response)=>{
  return this.employees;
   }), take(1), tap((employees) =>{
    employeeInd= employees.findIndex((e)=> {
      console.log(e.id);
      console.log(employee.id);
     return e.id==employee.id;
    });
    console.log(employeeInd);
    console.log(employee.id);
   let employeeArr= [...employees];
   employeeArr.splice(employeeInd, 1);
   this.employees.next(employeeArr);

     }) 
);
  }

  createEmployee(employee:EmployeeModel){
    console.log(employee);
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.post<{employeeId:string, success:boolean, error:any}>('http://127.0.0.1:8000/api/employee',employee, { headers: headers });
    }), take(1), switchMap((response)=>{
      this.newEmployee.id = response.employeeId;
  return this.employees;
   }), take(1), tap((employees) =>{
      this.employees.next(employees.concat(this.newEmployee));
      this.newEmployee =new EmployeeModel(null, new UserModel(0,'','','',"employee",''),'' ,"",'' ) ; ;

     })
);
  }

}
