import { UserModel } from "./user.model";

export class EmployeeModel {
    
    constructor(  public id:string | null,public user:UserModel,
         public profession:string,  public image:string,public file_name:string ){

    }
 
}