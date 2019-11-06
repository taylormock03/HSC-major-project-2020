import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../.././service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-admin-roster',
  templateUrl: './admin-roster.component.html',
  styleUrls: ['./admin-roster.component.css']
})
export class AdminRosterComponent implements OnInit {

  constructor(
      private ps: ServiceService, 

  ) { }

  ngOnInit() {
  }

  createRoster(){
    this.ps.createRoster(this.ps.getPeople())
  }
}