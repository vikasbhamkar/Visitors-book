import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
showbtn : boolean = true;
@Input() show !:boolean;
  constructor() {  }

  ngOnInit(): void {
  }
  ngOnChanges():void{
    this.showbtn=this.show;
    console.log(this.showbtn);
  }

}
