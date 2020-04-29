import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor(
      private ps: ServiceService, 

  ) { }

  roster:any;
  date:any;
  week:any;

  ngOnInit(){
    this.roster = this.ps.getRoster()
    this.date=new Date().getTime()

    this.week=this.getWeek(this.date);
    console.log(this.week)


  }
  
getWeek(date){
  let i=0
  let current_week= -999
  for (let x of this.roster){
    if (date < x.backEndDate){
      if(i>0){
        if(date>this.roster[i-1].backEndDate){
          current_week=i 
          }
      }
      else{
        current_week=i
      }
      
    }
    i++
  }
  console.log(this.roster.length, current_week)

  if (current_week>this.roster.length-1 || current_week==-999){
    document.getElementById("error").innerHTML = "No current rosters have been made. If you think this is an issue, please call - 1900 654 321";
    return 0

  }
  return current_week
}

  }