import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VisitorService } from '../service/visitor.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Vmodel } from '../model/vmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  vform!: FormGroup;
  vmodelobj: Vmodel = new Vmodel();
  showadd !: boolean;
  showupdate!: boolean;
  loging: boolean = false;

  searchtext: string = '';
  vlistdata: Vmodel[] = [];
  @Output() show :EventEmitter<boolean> = new EventEmitter();

  constructor(private vservice: VisitorService, private fb: FormBuilder, private route : Router) { }

  ngOnInit(): void {
    this.vform = this.fb.group({
      Name: [''],
      Address: [''],
      City: [''],
      Mo: ['']
    })
    this.show.emit(this.loging);
        console.log(this.loging);
    this.getvldata();
  }

  clickadddata() {
    this.vform.reset();
    this.showadd = true;
    this.showupdate = false;
  }

  getvldata() {
    this.vservice.getvlist().subscribe(res => {
      this.vlistdata = res;
    })
  }

  postvlist() {
    this.vmodelobj.Name = this.vform.value.Name;
    this.vmodelobj.Address = this.vform.value.Address;
    this.vmodelobj.City = this.vform.value.City;
    this.vmodelobj.Mo = this.vform.value.Mo;
    this.vservice.addvlist(this.vmodelobj).subscribe(res => {
      alert("Data saved Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.vform.reset();
      this.getvldata();
    },
      err => {
        alert("Something Went Wrong");
      }
    )
  }

  deletelistdata(id: number) {
    this.vservice.deletevlist(id).subscribe(res => {
      alert("Data deleted Successfully");
    })
    this.getvldata();
  }

  onedit(data: Vmodel) {
    this.showadd = false;
    this.showupdate = true;
    this.vmodelobj.id = data.id;
    this.vform.controls['Name'].setValue(data.Name);
    this.vform.controls['Address'].setValue(data.Address);
    this.vform.controls['City'].setValue(data.City);
    this.vform.controls['Mo'].setValue(data.Mo);

  }

  onupdatelist() {
    this.vmodelobj.Name = this.vform.value.Name;
    this.vmodelobj.Address = this.vform.value.Address;
    this.vmodelobj.City = this.vform.value.City;
    this.vmodelobj.Mo = this.vform.value.Mo;
    this.vservice.updatevlist(this.vmodelobj, this.vmodelobj.id).subscribe(res => {
      alert("Data Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.vform.reset();
      this.getvldata();
    })
  }
  key:string ='';
  reverse : boolean=false;
  sort(key:any){
    this.key=key;
    this.reverse=!this.reverse;
  }
}
