import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/UserModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //USER_URL: string = "http://localhost:7790/api/user";
  USER_URL: string = "http://localhost:8765/MoviePlex-User-Micro/api/user";
  userdata = [];
  userModel: UserModel;

  constructor(private http: HttpClient) { }

  getUserDetail(userId: string){
    return this.http.get(this.USER_URL+"/get/"+userId);
  }

  doModifyUser(data:any){
    return this.http.put(this.USER_URL+"/modify-user", data);
  }

  getAllUserList(){
    return this.http.get(this.USER_URL+"/get-all");
  }

  addUserData(data: any){
    this.userdata.push(data);
  }

  getUserData(){
    return this.userdata;
  }

  clearUserData(){
    this.userdata = [];
  }

  addUserModel(data: UserModel){  
    this.userModel = data;
  }

  getUserModel(){
    return this.userModel;
  }

}
