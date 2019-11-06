import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';

@Injectable({
   providedIn: 'root'
}

)
export class ServiceService {

  Roster = [];
  people=[];
  valid: any;
  visible:number;
  RosterForm: FormGroup;


  constructor(private fb: FormBuilder) {
    if (localStorage.people == null ) {
        localStorage.setItem('people', JSON.stringify(this.people));
    }
    if (localStorage.Roster == null) {
      localStorage.setItem('Roster', JSON.stringify(this.Roster));
    }
   }
    //user scripts
    checkAdd(addValues){
      this.valid = "pass";
      if (typeof addValues.fName === 'undefined' || addValues.fName == null || addValues.fName == "") {
        this.valid = "frnameFail";
    }
      else if (typeof addValues.lName === 'undefined' || addValues.lName == null || addValues.lName == "") {
        this.valid = "lnameFail";
    }
      else if (typeof addValues.password === 'undefined' || addValues.lName == null || addValues.lName == "") {
        this.valid = "passFail";
    }
    else if (typeof addValues.freq === 'undefined' || addValues.lName == null || addValues.lName == "") {
        this.valid = "freqFail";
    }
    return this.valid;
    }

    addPerson(person): void {
    let people = JSON.parse(localStorage.getItem('people'));
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
  }

    getPeople() {
    let people = JSON.parse(localStorage.getItem('people'));
    return people;
  }

    deletePerson(id): void {
    let people = this.getPeople()
    people.splice(id, 1);
    localStorage.setItem('people', JSON.stringify(people));
  }

  login(loginValues): void {
    this.valid = "false";
    let people = JSON.parse(localStorage.getItem('people'));
    var usercount = 0;
    while (usercount < people.length) {
      if (people[usercount].fName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password) {
        this.valid = "pass";
      }
      usercount++
    } // end while
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login

  loginid(loginValues): number {
    this.valid = "false";
    let people = JSON.parse(localStorage.getItem('people'));
    var usercount = 0;
    while (usercount < people.length) {
      if (people[usercount].fName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password) {
        this.valid = "pass";
      }
      usercount++
    } // end while
    return usercount-1
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login

  editPerson(person, id): void {
    let people = JSON.parse(localStorage.getItem('people'));
    people[id] = person;
    localStorage.setItem('people', JSON.stringify(people));
  }

  //admin scripts
  alogin(loginValues): void {
    this.valid = "false";
    let people = JSON.parse(localStorage.getItem('people'));
    var usercount = 0;
    while (usercount < people.length) {
      if (people[usercount].fName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password && people[usercount].level>=1) {
        this.valid = "pass";
      }
      usercount++
    } // end while
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login



  //Roster scripts

  
  createRoster(values):void{
    var userNum=0;
  for(let x of values){
    userNum++
  }
  var crucifer=[]
  var senior=[]
  var acolyte1=[]
  var acolyte2=[]
  var intercessor=[]
  var reader1=[]
  var reader2=[]
  var FullYear=[]

  //Roster each Month
  var year=new Date().getFullYear()
  var month=0
  var months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  
//create new arrays for month
    while (month<12){
      var cruciferMonth=[]
      var seniorMonth=[]
      var acolyte1Month=[]
      var acolyte2Month=[]
      var intercessorMonth=[]
      var reader1Month=[]
      var reader2Month=[]
      var times_rostered ={}
      
      //track user rosters
      for(let x of values){
        var uName=x.fName+" "+ x.lName
          times_rostered[uName]=0
        }


      var sundays = [];
      for (var i = 0; i <= new Date(year, month, 0).getDate(); i++) 
      {    
          var date = new Date(year, month, i);

          if (date.getDay() == 0 && months[date.getMonth()]==months[month])
          {
              //sundays.push(Date.parse(date))
            sundays.push(date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear());    
          }
      };

       for(let x of sundays){
    FullYear.push(x)
  }
      //create each month roster.
      //start crucifer
      while (cruciferMonth.length<sundays.length){
        
        var person=Math.floor(Math.random() * Math.floor(userNum));
         uName=values[person].fName+" "+ values[person].lName;

        if (
          values[person].approved==true && 
        values[person].crucifer==true && 
        values[person].freq>times_rostered[uName]
        )
        {
          cruciferMonth.push(uName)
          crucifer.push(uName)
          times_rostered[uName]++
        }
      }//end crucifer

      //start acolyte1
       while (acolyte1Month.length<sundays.length){
        let person=Math.floor(Math.random() * Math.floor(userNum));
        uName=values[person].fName+" "+ values[person].lName

        if (
          values[person].approved==true && 
          values[person].acolyte==true && 
          values[person].freq>times_rostered[uName] && 
          uName != cruciferMonth[acolyte1Month.length]

        )
        {
          acolyte1Month.push(uName)
          acolyte1.push(uName)
          times_rostered[uName]++
        }
      }//end acolyte1
      
      //start acolyte2
       while (acolyte2Month.length<sundays.length){
        let person=Math.floor(Math.random() * Math.floor(userNum));
        uName=values[person].fName+" "+ values[person].lName;

        if (
          values[person].approved==true && 
          values[person].acolyte==true && 
          values[person].freq>times_rostered[uName] && 
          uName != cruciferMonth[acolyte1Month.length] &&
          uName != acolyte1Month[acolyte2Month.length]
        )
        {

          acolyte2Month.push(values[person].fName+ " " + values[person].lName)
          acolyte2.push(values[person].fName+ " " + values[person].lName)
          times_rostered[uName]++
        }
      }//end acolyte2

//end monthly roster

      month++
    }
  //create an array of objects representing each week. Each object will contain a specific week's rosters
  var Roster=[]
  var index=0;
  for(let x of FullYear){
    Roster.push({
      date:x,
      crucifer: crucifer[index],
      acolyte1:acolyte1[index],
      acolyte2:acolyte2[index]

  })
    index++
  }
  
 //save roster in DB

 let roster = JSON.parse(localStorage.getItem('Roster'));
    roster.push(Roster);
    localStorage.setItem('roster', JSON.stringify(Roster));
  //end function
  }

  getRoster() {
    let roster = JSON.parse(localStorage.getItem('roster'));
    return roster;
  }
  //end ServiceService
}