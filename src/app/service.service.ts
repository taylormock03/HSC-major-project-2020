import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


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
    console.log(loginValues)
    let people = JSON.parse(localStorage.getItem('people'));
    var usercount = 0;
    while (usercount < people.length) {

      console.log(people[usercount].fName + " " + people[usercount].lName, people[usercount].password, loginValues.Login_Username)
      if (people[usercount].fName + " " + people[usercount].lName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password) {
        this.valid = "pass";
      }
      usercount++
    } // end while
    console.log(this.valid)
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login

  loginid(loginValues): number {
    this.valid = "false";
    let people = JSON.parse(localStorage.getItem('people'));
    var usercount = 0;
    while (usercount < people.length) {
      
      if (people[usercount].fName + " " + people[usercount].lName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password) {
        this.valid = "pass";
        break;
      }
     
      usercount++
    } // end while
    return usercount
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login

  editPerson(person, id): void {
    console.log(person)
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
      if (people[usercount].fName + " " + people[usercount].lName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password && people[usercount].level>=1) {
        this.valid = "pass";
      }
      usercount++
    } // end while
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login



  //Roster scripts
 getDaysBetweenDates(start, end, dayName) {
    var result = [];
    var days = {sun:1,mon:2,tue:3,wed:4,thu:5,fri:6,sat:0};
    var day = days[dayName.toLowerCase().substr(0,3)];
    // Copy start date
    var current = new Date(start);
    // Shift to next of required days
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
    // While less than end date, add dates to result array
    while (current <= end) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
    }
    return result;  
}
  
  createRoster(Users, date):void{
    let users = Users;
    console.log(users)
    let FinalDate = date[1];
    let FirstDate = date[0];
    var Weeks = this.getDaysBetweenDates(
              FirstDate,
              FinalDate,
              'Sun');
    var priorities = ["crucifer","acolyte1","acolyte2"]
    var times_looped =0

    
    for (let date of Weeks) {
        var WeekObject = {
          date:"",

          }
        WeekObject.date=date
        for (let job of priorities){
            times_looped = 0
            while (times_looped<100){
              let person= users[Math.floor(Math.random()*users.length)]
              //console.log(WeekObject, person, person[job] == true, !(person.fname in WeekObject&& person.lname in WeekObject))
              if (person[job] == true && !(person.fName in WeekObject&& person.lName in WeekObject)){
                WeekObject[job]=person.fName + " " + person.lName
                break
              }
              else{
                times_looped++
                if(times_looped>=100){
                  alert("week " + date + " could not find a job")
                  break;
                }
              }
              } 
            }
             console.log(WeekObject)
          }
         
        }  

    
    
  //save roster in DB
  /*
  let roster = JSON.parse(localStorage.getItem('Roster'));
      roster.push(Roster);
      localStorage.setItem('roster', JSON.stringify(Roster));

    //alert user

    alert("Roster Successfully created")
    //end function
    
    }*/

    getRoster() {
      let roster = JSON.parse(localStorage.getItem('roster'));
      return roster;
  }
  //end ServiceService
}