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
    try{
      this.roster=this.roster[this.week]
      }
    catch{
      this.roster={"error":"true"}
      }
    console.log(this.roster)
  }
  
getWeek(date){
  //if the roster object does not exist i.e has never been made, this try will fail
  try{
    let i=0
    //current_week is default value that is never achievable because it is negative. If this does not change, the program knows that there are no valid dates. 
    let current_week= -999
    for (let x of this.roster){
      //check if today's date is less than the date of the week being checked
      if (date < x.backEndDate){
        if(i>0){
          //check if today's date is greater than the date of the previous week. if both statements are true, we know that we have picked the right week
          if(date>this.roster[i-1].backEndDate){
            current_week=i 
            }
        }
        //this is in case the first week of the roster is the current week. Because there is no prior date to check, we automatically assume that it is correct
        else{
          current_week=i
        }
        
      }
      i++
    }
    //checks that the date is valid. 
    if (current_week>this.roster.length-1 || current_week==-999){
      document.getElementById("error").innerHTML = "No current rosters have been made. If you think this is an issue, please call - 1900 654 321";
      return 0

    }
    return current_week
  }

  catch(err){
    document.getElementById("error").innerHTML = "No current rosters have been made. If you think this is an issue, please call - 1900 654 321";
    return 0 
    console.log("Roster does not exist")
  }
}

  }