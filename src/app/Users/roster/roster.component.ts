import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../.././service.service';
import {MatPaginator,MatTableDataSource,MatSort} from '@angular/material';

export interface RosterElement {
  date: string;
  Sidesperson1: string;
  Sidesperson2: string;
  Reader1: string;
  Reader2: string;
  Intercessor: string;
  SeniorServer: string;
  Crucifer: string;
  Acolyte1: string;
  Acolyte2: string;
  Chalice1: string;
  Chalice2: string;
  Thurifer: string;
}

 
@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  constructor(private ps: ServiceService) { }

  ELEMENT_DATA: RosterElement[] = this.ps.getRoster();
  displayedColumns: string[] = ['date', 'Crucifer', 'Acolyte1', 'Acolyte2'];
  dataSource = new MatTableDataSource<RosterElement>(this.ELEMENT_DATA)
  roster:any;

 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  ngOnInit() {
        this.dataSource.paginator = this.paginator;
  }

}