import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DeleteDialogueComponent } from '../../delete-dialogue/delete-dialogue.component';
import { ServiceService } from '../.././service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ps: ServiceService, public dialog: MatDialog) { }
  
  people: any;


  ngOnInit() {
        this.people = this.ps.getPeople() 
        console.log(this.people)

  }

 // ------ DIALOG BOX --------------//
  // openDialog() FUNCTION
  // When the user clicks the "DELETE" button on the Form 
  // a dialog box will open and
  // the "id" of that person is passed to it as a parameter.
  openDialog(id: number): void {
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