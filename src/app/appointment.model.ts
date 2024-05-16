import { ItemModel } from "./item.model";

export class AppointmentModel {
 
    constructor(public id:string | null, public date:string | null, public start_time:Date, public end_time:Date, public items:ItemModel[],
        public cost:number ){
   
    }
      
   }