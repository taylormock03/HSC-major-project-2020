import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../.././service.service';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  constructor(private ps: ServiceService) { }

  roster:any;

  ngOnInit() {
    this.roster=this.ps.getRoster()
  }

}