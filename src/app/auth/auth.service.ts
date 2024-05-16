import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserModel } from '../user.model';

interface UserData{
  name:string;
  email:string;
  password:string;
  contact:string;
}

interface AuthResponseData{
  access_token:string;
  name:string;
  type: 'employee' | 'client' | 'manager';
  id:number;
  registered?:boolean;
  success:boolean;
error: any;  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _user= new BehaviorSubject<UserModel | null>(null);
private _isUserAuthenticated=false;
  constructor(private http:HttpClient) { }

  get isUserAuthenticated(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return !!user._token;
     } else return false;
    }));
  }

  get user(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return user;
     } else {
     return null;}
    }));
  }

  get userType(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return user.userType;
     } else {
     return null;}
    }));
  }
  


  get token(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return user._token;
     } else {
     return null;}
    }));
  }

  logIn(user:UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>('http://127.0.0.1:8000/api/login' ,{
      email:user.email,password:user.password }
         ).pipe(tap(  (data) =>{
         const userLogged= new UserModel(data.id , 
          user.email, data.name, user.password, data.type, data.access_token);
          this._user.next(userLogged);
          console.log("User token pri loginu: "+ userLogged._token);
         }

         ));
  }

  logOut() {
   return this.http.post('http://127.0.0.1:8000/api/logout', {}).pipe( tap(
      (response) => {
        console.log('Logout successful:', response);
        this._user.next(null);
      }
    ));
  }

  register(user:UserData){
    this._isUserAuthenticated=true;
   return this.http.post<AuthResponseData>('http://127.0.0.1:8000/api/register' ,{
 email:user.email,password:user.password, name: user.name, contact: user.contact
    }
    ).pipe(tap(  (data) =>{
      const userRegistered= new UserModel(data.id ,
       user.email,user.name, user.password,'client', data.access_token);
       this._user.next(userRegistered);
      }

      ));
  }
}