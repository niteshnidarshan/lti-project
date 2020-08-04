import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  //USER_URL = "http://localhost:7790/api/user";
  //USER_URL = "http://localhost:8765/MoviePlex-User-Micro/api/user";
  //USER_URL = "http://localhost:8765";
  USER_URL = "https://movieplex-ag.herokuapp.com";
  
  constructor(private http: HttpClient) { }

  registerUser(data: any){
    return this.http.post(this.USER_URL+"/register-user", data);
  }
}
