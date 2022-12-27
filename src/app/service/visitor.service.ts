import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Vmodel } from '../model/vmodel';
import { signup } from '../model/signup.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  url: string = "http://localhost:3000/posts/";
  url1: string = "http://localhost:3000/login/";

  constructor(private http: HttpClient) { }

  postsignup(data : signup){
    return this.http.post<signup>(this.url1,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getsignin(){
    return this.http.get<signup>(this.url1).pipe(map((res:any)=>{
      return res;
    }))
  }

  getvlist() {
    return this.http.get<Vmodel>(this.url).pipe(map((res: any) => {
      return res;
    }))
  }

  addvlist(data: Vmodel) {
    return this.http.post<Vmodel>(this.url, data).pipe(map((res: any) => {
      return res;
    }))
  }

  updatevlist(data: Vmodel, id: number) {
    return this.http.put<Vmodel>(this.url + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  deletevlist(id: number) {
    return this.http.delete<Vmodel>(this.url + id).pipe(map((res: any) => {
      return res;
    }))
  }
}
