import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../.././service.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-user-availabilities',
  templateUrl: './user-availabilities.component.html',
  styleUrls: ['./user-availabilities.component.css']
})
export class UserAvailabilitiesComponent implements OnInit {
// Create Instance of PeopleService(ps) and MatDialog (dialog)
  LoginForm: FormGroup;
  valid: any;
  errorMessage: any;
  count = 0;
  id:number;

  constructor(
    private fb: FormBuilder,
    private ps: ServiceService,
    private route: Router, private actroute: ActivatedRoute

  ) { }


  ngOnInit() {
    this.initialiseForm();
    this.errorMessage = "";
  }


  // ------------------ VALIDATION WHEN SUBMITTING FORM---------------------------------------//
  submit(): void {
    if (this.count<3){
      this.valid = this.ps.login(this.LoginForm.value);
      this.id=this.ps.loginid(this.LoginForm.value)
      console.log(this.id)
      if (this.valid == "pass") {
        this.errorMessage = "";
        this.route.navigate(['/uEdit', this.id])
      }
      if (this.valid == "false") {
        this.count = this.count + 1;
        if (this.count == 3) {
          this.errorMessage = "LOCKOUTED - PLease Admin";
          
        } else {
          this.errorMessage = "Incorrect Username or Password";
        }
      }

      this.LoginForm.reset();
    }
  }


  // FORM INITIALISATION ==============================================================
  initialiseForm(): void {
    this.LoginForm = this.fb.group(
      {
        Login_Username: [null],
        Login_Password: [null],
      }
    );

  } // end initialiseForm



}