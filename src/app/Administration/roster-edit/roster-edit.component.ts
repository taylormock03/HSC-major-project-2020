import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../.././service.service';
import { DeleteDialogueComponent } from '../.././delete-dialogue/delete-dialogue.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-roster-edit',
  templateUrl: './roster-edit.component.html',
  styleUrls: ['./roster-edit.component.css']
})
export class RosterEditComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private fb: FormBuilder,
    private ps: ServiceService, 
    public dialog: MatDialog) { }

  rosterForm: FormGroup;

  //router
  id: number;
  private sub: any;
  //people array
  roster: any

  ngOnInit() {
    // Call the PeopleService Method 'getPeopleArray'
    // returns all the people data
    this.roster = this.ps.getRoster();

    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });
    // FUNCTION INITIALISE FORM - see below
    // Pass it two paramters 1. people data array and 2. Current ID of the person
    // clicked on in the List
    this.initialiseForm(this.roster, this.id); // Creates a form Group
  } // end ngOnInit

  message: string = "";
  editShowBut: boolean = true;
  bntStyle: string = '';

  submitEdit() {
    // Grap the edited values from the Form
    const form = this.rosterForm.value;
    // Call the PeopleService Method 'editPerson'
    // Pass it two paramters 1.Edited form values  and 2. Current ID of the person
    // clicked on in the List
    this.ps.editRoster(form, this.id);
    this.roster = this.ps.getRoster();
    this.message = "Your Form Data has been UPDATED";
    this.bntStyle = 'mat-fab';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // Function to populate form
  initialiseForm(people, id): void {
    this.rosterForm = this.fb.group(
      {
        backEndDate:[this.roster[id].backEndDate],
        crucifer: [this.roster[id].crucifer],
        senSer: [this.roster[id].senSer],
        acolyte1: [this.roster[id].acolyte1],
        acolyte2: [this.roster[id].acolyte2],
        chalice: [this.roster[id].chalice],
        date: [this.roster[id].date],
        intercessor: [this.roster[id].intercessor],
        sidesperson: [this.roster[id].sidesperson],
        sidesperson2: [this.roster[id].sidesperson2],
        reader: [this.roster[id].reader],
        reader2: [this.roster[id].reader2],
        thurifer: [this.roster[id].thurifer],
      }
    );

  } // end i


}