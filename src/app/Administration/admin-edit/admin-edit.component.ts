import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../.././service.service';
import { DeleteDialogueComponent } from '../.././delete-dialogue/delete-dialogue.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ps: ServiceService, 
    public dialog: MatDialog) { }

  // Make my 'peopleForm' a FormGroup
  peopleForm: FormGroup;

  //router
  id: number;
  private sub: any;
  //people array
  people: any

  ngOnInit() {
    // Call the PeopleService Method 'getPeopleArray'
    // returns all the people data
    this.people = this.ps.getPeople();

    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });
    // FUNCTION INITIALISE FORM - see below
    // Pass it two paramters 1. people data array and 2. Current ID of the person
    // clicked on in the List
    this.initialiseForm(this.people, this.id); // Creates a form Group
  } // end ngOnInit

  message: string = "";
  editShowBut: boolean = true;
  bntStyle: string = '';

  submitEdit() {
    // Grap the edited values from the Form
    const form = this.peopleForm.value;
    // Call the PeopleService Method 'editPerson'
    // Pass it two paramters 1.Edited form values  and 2. Current ID of the person
    // clicked on in the List
    this.ps.editPerson(form, this.id);
    this.people = this.ps.getPeople();
    this.message = "Your Form Data has been UPDATED";
    this.bntStyle = 'mat-fab';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // Function to populate form
  initialiseForm(people, id): void {
    this.peopleForm = this.fb.group(
      {
        fName: [this.people[id].fName],
        lName: [this.people[id].lName],
        cDetails: [this.people[id].cDetails],
        password: [this.people[id].password],
        crucifer:[this.people[id].crucifer],
        senSer:[this.people[id].senSer],
        acolyte:[this.people[id].acolyte],
        sidesperson:[this.people[id].sidesperson],
        welcomer:[this.people[id].welcomer],
        chalice:[this.people[id].chalice],
        reader:[this.people[id].reader],
        intercessor:[this.people[id].intercessor],
        approved:[this.people[id].approved]
      }
    );

  } // end i

  openDialog(id: number): void {
    console.log(id)
    // --- dialogConfig -----//
    // The dialog box is given a width and height and the "id"
    // is passed to the dialog box as a varaibel called "data"
    const dialogConfig: MatDialogConfig = {
      // NC: changed how this is instantiated slightly
      width: '500px',
      height: '250px',
      // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
      data: id,    
    };  //end dialogConfig

     // --- OPENS DIALOG  -----//
    this.dialog.open(DeleteDialogueComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          //not accessed
        } else {
          this.people = this.ps.getPeople();
        }
      }
    ); // end this.dialog.open
  } // end openDialog Fuction

}