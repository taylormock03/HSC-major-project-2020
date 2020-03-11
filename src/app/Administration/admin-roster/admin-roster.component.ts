import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ServiceService } from '../.././service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-roster',
  templateUrl: './admin-roster.component.html',
  styleUrls: ['./admin-roster.component.css']
})
export class AdminRosterComponent implements OnInit {
  peopleForm: FormGroup;


  constructor(
      private ps: ServiceService, 
      private fb: FormBuilder,
  ) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(Jobs, event.previousIndex, event.currentIndex);
  }

  roster:any;

  ngOnInit() {
    this.roster=this.ps.getRoster()
    this.peopleForm = this.fb.group(
      {
        date:[null],
        jobs:this.fb.array(["Crucifer","Acolyte","Senior Server"])       
      }
    
    );
    
  }
  
  submit(): void {  
    this.ps.createRoster(this.ps.getPeople(), this.peopleForm.value.date)
  }
  get Jobs() {
      return this.peopleForm.get('jobs') as FormArray;
    }
  
}