import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../.././service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  peopleForm: FormGroup;
  valid: any;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private ps: ServiceService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    // INITIALFORM FUNCTION  (bottom of page)
    // This will create our HTML form "peopleForm" as a FormGroup
    // and define our forms Controls. Later we can access validation functions
    // from the FormBuilder helper class. eg validate an email...
    // this validation can be real time
    this.peopleForm = this.fb.group(
      {
        fName: [null],
        lName: [null],
        cDetails: [null],
        password: [null],
        crucifer:[false],
        senSer:[false],
        acolyte1:[false],
        acolyte2:[false],
        sidesperson:[false],
        sidesperson2:[false],
        welcomer:[false],
        chalice:[false],
        reader:[false],
        reader2:[false],
        intercessor:[false],
        approved:[false],
        freq:[null],
        level:[0],
        date:[null],          
      }
    );

    // ------------VALIDATION USING 'OBSERVABLE -------------------//
    // Here our poeopleForm formgroup has an Observable method called 'valueChanges'
    // this will map to any of our form fields in real time.  So we can validate the data 
    // entered into the form field by the user in real time and give then feedback 
    this.peopleForm.valueChanges 
      .subscribe((formData) => {
          // formData represents all of the form field elements
          // Look in the console and look at specific fields as you enter data
      })  // END OF "OSERVABLE "VALIDATIONS

  }   // end ngOnInit

  // ------------------ VALIDATION WHEN SUBMITTING FORM---------------------------------------//
  submit(): void {  
    this.errorMessage = "";
    this.valid = this.ps.checkAdd(this.peopleForm.value);
    if (this.valid == "pass") {
      this.ps.addPerson(this.peopleForm.value);
      alert("Data added to database" ) ;
      this.peopleForm.reset();
      //this.router.navigate(['/home']);

    }
    if (this.valid == "frnameFail") {
      alert("Please enter your first name" )
    }   

    else if (this.valid == "lnameFail") {
      alert("Please enter your last name");
    }        
    else if (this.valid == "passFail") {
      alert("Please enter a password");
    }    
    else if (this.valid == "freqFail") {
      alert("Please enter how many days you wish to work");
    }

  }

}