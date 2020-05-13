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

  constructor() { }

  ngOnInit() {
  }

}