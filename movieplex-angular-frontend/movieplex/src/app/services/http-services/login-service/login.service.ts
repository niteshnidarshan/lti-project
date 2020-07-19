import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //LOGIN_URL: string = "http://localhost:7790/api/user";
  LOGIN_URL: string = "http://localhost:8765/MoviePlex-User-Micro/api/user";

  constructor(private http: HttpClient) { }

  doLogin(data: LoginModel){
    return this.http.post(this.LOGIN_URL+"/login",data);
  }
}
