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
    //checks if the people and roster objects exist in storage
    if (localStorage.people == null ) {
        localStorage.setItem('people', JSON.stringify(this.people));
        let new_person={
          "fName":"admin",
          "lName":"admin",
          "password":"admin",
          "level":1
        }
      let  new_db=[new_person]
      localStorage.setItem('people', JSON.stringify(new_db));

        
    }
    if (localStorage.Roster == null) {
      localStorage.setItem('Roster', JSON.stringify(this.Roster));
    }
   }
    //user scripts
    checkAdd(addValues){
      //validates the values entered by new users
      this.valid = "pass";
      if (typeof addValues.fName === 'undefined' || addValues.fName == null || addValues.fName == "") {
        this.valid = "frnameFail";
    }
      else if (typeof addValues.lName === 'undefined' || addValues.lName == null || addValues.lName == "") {
        this.valid = "lnameFail";
    }
      else if (typeof addValues.password === 'undefined' || addValues.password == null || addValues.password == "") {
        this.valid = "passFail";
    }
    else if (typeof addValues.freq === 'undefined' || addValues.freq == null || addValues.lName == "") {
        this.valid = "freqFail";
    }
    return this.valid;
    }

    addPerson(person): void {
      //adds in new user to the "people" object
    let people = JSON.parse(localStorage.getItem('people'));
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
  }

    getPeople() {
      //loads all users
    let people = JSON.parse(localStorage.getItem('people'));
    return people;
  }

    deletePerson(id): void {
      //deletes user based on id passed
    let people = this.getPeople()
    people.splice(id, 1);
    localStorage.setItem('people', JSON.stringify(people));
  }

  login(loginValues): void {
    //checks that the login values are valid
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
    //finds the id of the person trying to login
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
    //edits the user's data
    console.log(person)
    let people = JSON.parse(localStorage.getItem('people'));
    people[id] = person; 
    localStorage.setItem('people', JSON.stringify(people));
  }

  //admin scripts
  alogin(loginValues): void {
    //checks that the user logging in is using correct credentials AND has admin priviliges i.e (people[usercount.level>=1])
    this.valid = "false";
    let people = JSON.parse(localStorage.getItem('people'));
    var usercount = 0;
    while (usercount < people.length) {
      if (people[usercount].fName + " " + people[usercount].lName == loginValues.Login_Username && people[usercount].password == loginValues.Login_Password) {
        
        if( people[usercount].level>=1){
          this.valid = "pass";
        }
        else{
          this.valid="admin"

        }
      }
      usercount++
    } // end while
    return this.valid
    //localStorage.setItem('loginDB', JSON.stringify(loginDB));
  } // end login



  //Roster scripts
 getDaysBetweenDates(start, end, dayName) {
   //checks how many days are between two given dates. It takes all the sundays, and passes them as an array back to the main roster program
    var result = [];
    var finalResult = [];
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
    for (let x of result){
      finalResult.push(Date.parse(x))

    }

    return finalResult;  
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

    //this is the order in which the jobs will be rostered
    var priorities = ["senSer","crucifer","acolyte1","acolyte2","intercessor","chalice","reader","reader2","sidesperson","sidesperson2"]
    
    var times_looped =0
    var roster =[]
    var times_rostered={}
    var previous_month=-1

    //cycles between every week in the array "Weeks"
    for (let date of Weeks) {
        //create the week object that stores a week's roster. This is reset for every new week
        var WeekObject = {
          }
        WeekObject["date"]=new Date(date).toUTCString()
        WeekObject["backEndDate"]=date

        //calculate which month is being rostered
        let month = new Date(date).getUTCMonth()
        //if the current month is different than the previous month, the dictionary keeping track of how many times a user has been rostered gets reset
        if (month > previous_month){
            for (let x of users){
                times_rostered[x.fName+x.lName]=0
              }
        }       

        //cycles through every job in the priorities array in order that they were written 
        for (let job of priorities){
            
            times_looped = 0
            //this is a failsafe incase no users can be rostered
            while (times_looped<100){
              //chooses a random user
              let person= users[Math.floor(Math.random()*users.length)]
              //validates that the user can work the job and has not been rostered too many times
              if (
                person[job] == true && 
                this.checkWeek(person.fName + " " + person.lName,WeekObject)
                && this.checkdate(person,WeekObject)
                && parseInt(person.freq)>times_rostered[person.fName+person.lName]
                ){
                WeekObject[job]=person.fName + " " + person.lName
                times_rostered[person.fName+person.lName]+=1
                times_looped=0
                break
              }
              else{
                //if they are an invalid user, times_looped increases and a new user is picked randomly
                times_looped++
                //if no user is found the failsafe activates and launches an alert that a job couldn't be found. It then moves on to the next job
                if(times_looped>=100){
                  //alert("week " + date + " could not find someone for: " + job)
                  console.log("fail")
                  break;
                }
                
              }
              
              
              } 
            }
            //sends the week's roster to the full roster
             roster.push(WeekObject)
             
             previous_month=month
          }

  //save roster in DB
  
  let Roster = JSON.parse(localStorage.getItem('roster'));
      Roster=roster;
      localStorage.setItem('roster', JSON.stringify(roster));

    //alert user

    alert("Roster Successfully created")
    
    //end function
    
    }

    getRoster() {
      //loads roster
      let roster = JSON.parse(localStorage.getItem('roster'));
      return roster;
  }

  checkWeek(user, week){
    //checks that the user has not already been roster in a given week. It is called during the main validation
    let valid=true
    for(let x in week){

      if (user == week[x]){
        valid=false;
      }
    }
    return valid;
  }

  checkdate(user, week){
    //checks that the user has not requested to not be times_rostered
    //if the user has not entered time off, this try statement will fail, thereby allowing them to be rostered
  try{
   var fDate,lDate,cDate;
    fDate = Date.parse(user.date[0]);
    lDate = Date.parse(user.date[1]);
    cDate = Date.parse(week.date);

  //checks that the date range requested off does not contain the current week's date
  if((cDate <= lDate && cDate >= fDate)) {
        return false;
    }
    return true;
  }
  catch{
    return true
  }
  }

  //end ServiceService
}