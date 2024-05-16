export class UserModel {
    
    constructor(public id:number,
         public email:string,  public name:string, public password:string, public  userType: 'employee' | 'client' | 'manager',
         private token:string){

    }

    get _token(){
  return this.token;
    }
 
}