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
    console.log(this.roster)
    this.date=this.getDate();
    this.week=this.getWeekNumber(new Date);
    this.display();

  }
  getDate(){
    let curr = new Date 
    let week = ""

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week=day;
      }
    return week;
  }

 getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = Number(new Date(Date.UTC(d.getUTCFullYear(),0,1)));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d -yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}
  display(){
    document.getElementById("week").innerHTML = this.date;
  }

  }