import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogService  } from '../services/log.service';
import { formatDate } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  temp = 0;
  skip =0;
  limit :any = 15;
  // FORM INPUT VARIABLES
  search_filter:any;
  search_drop:any;
  type_filter :any;
  date_filter :any ;
  from_hour :any;
  from_minute:any;
  from_meridiem:any;
  to_hour :any;
  to_minute:any
  to_meridiem:any; 

// TIME VARIABLES
  current_time :any = new Date(Date.now())
  current_hour :any = this.current_time.getHours();
  current_minute :any = this.current_time.getMinutes();
   ampm :any;
   log_data :any =[];
   selected_data:any = [];
   display_data:any = [];
   display_data_length:any;
   hours =['01','02','03','04','05','06','07','08','09','10','11','12'];
   minutes = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
   from_timeStamp :any;
   to_timeStamp :any;
  //  DOM VARIABLES
   table_type :any;
   table_msg :any;
   table_time :any;
   table_messages :any;
   table_content :any = '';
   display_value :any =10;
  constructor(private logService:LogService) { }
   
  ngOnInit(): void {
 
 
    this.ampm = this.current_hour >= 12 ? 'pm' : 'am';
    let hours :any = this.current_hour % 12;
    hours = hours ? hours : 12;
    if(hours <10)
    {
      hours = '0'+hours;
    }
    if(this.current_minute <10)
    {
      this.current_minute = '0'+this.current_minute;
    }
    // console.log(hours);
    this.search_filter = new FormControl('');
    this.search_drop = new FormControl('table');
    this.type_filter = new FormControl('all');
    this.date_filter = new FormControl(formatDate(this.current_time, 'yyyy-MM-dd', 'en'));
    this.from_hour = new FormControl('12');
    this.from_minute = new FormControl('00');
    this.from_meridiem = new FormControl('am');
    this.to_hour = new FormControl(hours);
    this.to_minute = new FormControl(this.current_minute);
    this.to_meridiem = new FormControl(this.ampm);
    

  console.log(Date.now());
  
  //  let datum = Date.parse('2021/03/22 13:24:55'); // 'yyyy/mm/dd hh:mm:ss'
  //  console.log(datum);

   let toHours_24hr :any = Number(this.to_hour.value) ;
   if(this.to_meridiem.value == 'am' && this.to_hour.value == 12 )
   {
       toHours_24hr = 0;
       console.log(toHours_24hr);
  
   }


   if(this.to_meridiem.value == 'pm' && this.to_hour.value != 12)
   {
       toHours_24hr += 12;
       console.log(toHours_24hr);    
   }

   if(toHours_24hr <10)
   {
     toHours_24hr = '0'+toHours_24hr;
   }
   
   
  let from_time =  this.date_filter.value.replace(/-/g,'/')+" "+"00:00:00";
  let from_timeStamp = Date.parse(from_time);
 console.log(from_timeStamp);
 
  let to_time =  this.date_filter.value.replace(/-/g,'/')+" "+toHours_24hr+":"+this.to_minute.value+':00';
  let to_timeStamp = Date.parse(to_time);
  
  console.log(to_timeStamp);
    
    
    
    // this.logService.getLogData
    // .then(log_res=>{
    //   this.log_data = log_res;
    //   this.selected_data = this.log_data;
      
    //   this.selected_data =this.log_data.filter((data:any)=>{
    //         if(data.time >=from_timeStamp && data.time <=to_timeStamp   )
    //         {
    //           console.log(data);
              
    //           return data
    //         }
    //   });
    
    //   this.display_data = this.selected_data;
    //  this.tableDomProcess();
    // })


    // .catch(log_err =>{console.log(log_err);
    // });

    // GET DATA FROM DATABASE
     
    this.logService.getLogs(`?limit=15&fromTime=${from_timeStamp}&toTime=${to_timeStamp}`)
    .then(log_res=>{
      this.log_data = log_res;
      this.selected_data = this.log_data;
     console.log(this.selected_data);
     
     
    
    
      this.display_data = this.selected_data;
      console.log(this.display_data.length);
      let viewMore :any = document.querySelector('.view-more');
      if(log_res.length < 15)
      {
        viewMore.style.display = 'none'; 
      }
      else
      {
        viewMore.style.display = 'block'; 
      }
     this.AmTopmConvert();
     this.tableDomProcess();
    })


    .catch(log_err =>{console.log(log_err);
    });
  }

  // ON CLICK OF SEARCH INPUT AND CHANGE OF TYPE ,DATE AND TIME
  // getTableContents()
  // {
  //   console.log("click executed");
  //      this.table_messages = document.querySelectorAll('.message-content');
  //      this.table_content = document.querySelectorAll(".table-content");
    
  // }

  // ONCHANGE OF SEARCH DROPDOWN AND ON KEYUP OF SEARCH INPUT 
  SearchChange()
  {
    // this.logService.getLogs()
    // let current_table_messages :any = document.querySelectorAll('.message-content');
    // let  table_container :any = document.querySelector(".table-content-container");
   
    // if(this.search_drop.value == 'table' && this.search_filter.value != null && this.search_filter.value.length != 0 && this.search_filter.value != undefined)
    // {
    //   console.log( this.search_filter.value);
    //   let search_text = this.search_filter.value.toString().toLowerCase();
    //   for(let i=0;i<this.table_messages.length;i++)
    //   {
       
    //     if(!this.table_messages[i].textContent.toLowerCase().includes(search_text))
    //     {
    //       let remove_element =this.table_messages[i].parentElement;
    //       remove_element.remove();
    //       console.log(this.temp);
    //       if(i == this.table_messages.length -1)
    //       {
    //         this.temp = this.table_messages.length;
    //       }
          
    //     }

    //     if(this.table_messages[i].textContent.toLowerCase().includes(search_text) )
    //     {
    //       console.log(this.temp);
    //       console.log(this.table_messages.length);
          
          
    //       if(this.temp == this.table_messages.length )
    //       {
    //         console.log("successfully executed");
            
    //         for(let j=0;j<this.table_messages.length;j++)
    //         {
           
    //            table_container.appendChild(this.table_messages[i].parentElement);
    //           console.log("div added ");
              
    //          }
    //       }
    //      else{
    //       for(let j=0;j<current_table_messages.length;j++)
    //       {
    //         if(current_table_messages[j].textContent.toLowerCase() !=  this.table_messages[i].textContent.toLowerCase() )
    //         {
    //             table_container.appendChild(this.table_messages[i].parentElement);
    //         }
    //       }
    //      } 
      
          
    //     }
      
      
    //   }
    //  console.log(this.table_messages);
     
      
    // }
    // if(  this.search_filter.value.length == 0 )
    // {
    //   let  table_container :any = document.querySelector(".table-content-container");
    //   console.log(table_container);
      
    //   for(let i=0;i<this.table_content.length;i++)
    //   {
    //     table_container.appendChild(this.table_content[i]);
    //   }
      
    // }
    // if(this.search_drop.value == 'database')
    // {
    //   console.log("db executed");
    //   console.log(this.search_filter.value);
    // }
  }



  // ON CHANGE OF TYPE INPUT 

  // typeChange()
  // {
  //   console.log("type_change executed");
  //   console.log(this.type_filter.value);
   
  //   if(this.type_filter.value == 'all')
  //   {
  //   //  this.logService.getLogs("?limit=15&fromTime=")
  //     this.display_data = this.selected_data.slice(0,15);
  //     this.AmTopmConvert();
  //     console.log(this.display_data);
      
  //   }
  //   else
  //   {
  //     this.display_data =this.selected_data.filter((data:any)=>{
  //           if(data.type == this.type_filter.value )
  //           {
  //             return data
  //           }
  //        })
  //   }
  
  //   this.tableDomProcess();
  //   // this.getTableContents();
  //   console.log(this.selected_data);
    
  // }

  // ON CHANGE OF DATE AND TIME INPUT
  setDefaultTime()
  {
    this.from_hour = new FormControl('12');
    this.from_minute = new FormControl('00');
    this.from_meridiem = new FormControl('am');
    this.to_hour = new FormControl('11');
    this.to_minute = new FormControl('59');
    this.to_meridiem = new FormControl('pm');
  }


  dateChange()
  {
    this.twelveTo24hrs()
    this.logService.getLogs(`?limit=15&fromTime=${this.from_timeStamp}&toTime=${this.to_timeStamp}&search=${this.search_filter.value}&type=${this.type_filter.value}`)
    .then((log_res)=>{
      this.selected_data = log_res;
      console.log(this.selected_data); 
      this.display_data = this.selected_data;
      this.AmTopmConvert()
      this.tableDomProcess();
      // this.search_filter.patchValue("");
      this.skip =0;
      let viewMore :any = document.querySelector('.view-more');
      if(log_res.length < 15)
      {
        viewMore.style.display = 'none'; 
      }
      else
      {
        viewMore.style.display = 'block'; 
      }
        
    })
    .catch((log_err)=>{ console.log(log_err);
    })
  }

 
 
 viewMore()
 {
  this.twelveTo24hrs();
    this.skip += 15;

  this.logService.getLogs(`?limit=${this.limit}&fromTime=${this.from_timeStamp}&toTime=${this.to_timeStamp}&search=${this.search_filter.value}&type=${this.type_filter.value}&skip=${this.skip}`)
  .then((log_res)=>{
  console.log(log_res);
  for(let i=0;i<log_res.length;i++)
  {
    this.selected_data.push(log_res[i]);
  }
    console.log(this.selected_data); 
    if(log_res.length<15)
    {
      let viewMore :any = document.querySelector('.view-more');
      viewMore.style.display = 'none'; 
    }
    this.display_data = this.selected_data;
    this.AmTopmConvert()
    this.tableDomProcess();
    this.temp = this.selected_data.length;

  })
  .catch((log_err)=>{ console.log(log_err);
  })   
 }




 twelveTo24hrs()
 {
   let fromHours_24hr :any = Number(this.from_hour.value) ;
   console.log(this.from_meridiem.value);
   if(this.from_meridiem.value == 'am')
   {
     if(this.from_hour.value == 12)
     {
       fromHours_24hr = 0;
       console.log(fromHours_24hr);
     }
   }
   if(this.from_meridiem.value == 'pm')
   {
     if(this.from_hour.value != 12)
     {
       fromHours_24hr += 12;
     }
      
       console.log(fromHours_24hr);  
      
   }
   if(fromHours_24hr <10)
   {
     fromHours_24hr = '0'+fromHours_24hr;
   }
   console.log(fromHours_24hr);
   


   let from_time =  this.date_filter.value.replace(/-/g,'/')+" "+fromHours_24hr+":"+this.from_minute.value;
   console.log(from_time);
   
   this.from_timeStamp = Date.parse(from_time);
   // console.log(new Date (from_timeStamp));
  



   let toHours_24hr :any = Number(this.to_hour.value) ;

   if(this.to_meridiem.value == 'am')
   {
     if(this.to_hour.value == 12)
     {
       toHours_24hr = 0;
       console.log(toHours_24hr);
     }
   }


   if(this.to_meridiem.value == 'pm')
   {
     if(this.to_hour.value != 12)
     {
       toHours_24hr += 12;
     }
      
       console.log(toHours_24hr);  
      
   }

   if(toHours_24hr <10)
   {
     toHours_24hr = '0'+toHours_24hr;
   }
   let to_time =  this.date_filter.value.replace(/-/g,'/')+" "+toHours_24hr+":"+this.to_minute.value+':59';
   console.log(to_time);
    this.to_timeStamp = Date.parse(to_time);
 }

  AmTopmConvert()
  {
    for(let i=0;i<this.display_data.length;i++)
    {
      let time = new Date(Number(this.display_data[i].time ))
      var hours = time.getHours();
      var minutes :any  =time.getMinutes();
      console.log(minutes);
      
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes  = minutes < 10 ? '0'+minutes : minutes;
      this.display_data[i].hr_min = hours + ':' + minutes + ' ' + ampm;
    }
   
  }


  tableDomProcess()
  {
    setTimeout(()=>{
      this.table_type = document.querySelectorAll('.type');
      // console.log(this.table_type.length);
      for(let i=0;i<this.table_type.length;i++)
      {
        if(this.table_type[i].textContent == 'error')
        {
          this.table_type[i].style.color ="red";
        }
        if(this.table_type[i].textContent == 'warn')
        {
          this.table_type[i].style.color ="#FF5C00";
        }
        if(this.table_type[i].textContent == 'WARNING')
        {
          this.table_type[i].style.color ="#FF5C00";
        }
        if(this.table_type[i].textContent == 'info' || this.table_type[i].textContent == 'CRITICAL')
        {
          this.table_type[i].style.color ="#0075FF";
        }
        if(this.table_type[i].textContent == 'success')
        {
          this.table_type[i].style.color ="green";
        }
        if(this.table_type[i].textContent == 'ERROR')
        {
          this.table_type[i].style.color ="red";
          this.table_type[i].style.textTransform  ="capitalize";
        }
      }
    },0)
  }

}
