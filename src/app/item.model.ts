
export class ItemModel {
 
    constructor(public id:string | null, public user_id:string | null,  public service_id:string | null, public start_time:Date, public end_time:Date, public employee_name : string | null, 
        public employee_img : string | null, public service_name: string | null,public service_cost:number
     ){
   
    }
      
   }