import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ServiceService } from '../service.service';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.css']
})
export class DeleteDialogueComponent implements OnInit {

  constructor(private ps: ServiceService,
    public dialogRef: MatDialogRef<DeleteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // THis valiable will hold the people data 
  people: any;
  peopleForm: FormGroup;
  
  // "data" is what is PASSED to this component via the LIST component
  // assign to variable "id"
  id = this.data;
  // Varaible to display name
  displayName:string;


  ngOnInit() {
    this.people = this.ps.getPeople();
    // set variable "displatNme" to the peoople array at ID send to  
    this.displayName = this.people[this.id].fName  + "  " +  this.people[this.id].lName

  }

  delete(data) {

    console.log("in delete :" + data)
    this.ps.deletePerson(this.data);
  }

  close() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(value => {

    });
  }

}