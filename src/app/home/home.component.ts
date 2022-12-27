import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from '../model/signup.model';
import { VisitorService } from '../service/visitor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sign: boolean = true;
  loging: boolean = false;
  loginform !: FormGroup;
  signupform !: FormGroup;
  signupdata:signup[]=[];
  constructor(private fb: FormBuilder, private VService:VisitorService, private route:Router) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: [''],
      password: ['']
    })
    this.signupform=this.fb.group({
      email:[''],
      password:['']
    })
    this.sign = true;
    this.loging = false;
  }

  signin() {
    this.VService.getsignin().subscribe(res=>{
      const user = res.find((a:any)=>{
       return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
      })
      if(user){
        alert("Login Successfull !!");
        this.route.navigate(['vlist']);
        this.loginform.reset();

      }else{
        alert("User Not Found !! ");
      }
    }, err=>{
      alert("Something Went Wrong!!");
    })
  }


  signupswitch() {
    this.sign = !this.sign;
    this.loging = !this.loging;
  }

  signup(){
    this.VService.postsignup(this.signupform.value).subscribe(res=>{
      alert("User added successfully !!");
      this.signupform.reset();
      this.route.navigate(['home']);
      this.signupswitch();
    },
    err=>{
      alert("Something Went Wrong!!")
    })
  }

}
