import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + 'logs';
@Injectable({
  providedIn: 'root',
})
export class LogService {

    // LOG_JSON_URL = "http://localhost:4200/assets/jsons/logs.json";
    
  constructor(private http:HttpClient) { }

  // getLogData = new Promise<any> ((resolve,reject)=>{
   
  //   this.http.get(this.LOG_JSON_URL)
  //   .subscribe( 
  //       response =>
  //           {
  //           resolve(response);
  //           },
  //       error =>
  //           {
  //           reject(error);
  //           }
  //   )

  // })
  

  getLogs =  async (obj : any)=> new Promise<any>((resolve,reject)=>{
  
    this.http.get(BACKEND_URL+obj)
    .subscribe(
      response =>{
        console.log(obj);
        
        resolve(response);
                 },
      error =>{
           reject(error);
              }
    );
   })
}