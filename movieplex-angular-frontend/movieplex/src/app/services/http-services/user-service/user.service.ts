import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/models/UserModel';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../utilty-services/security/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //USER_URL: string = "http://localhost:7790/api/user";
  USER_URL: string = "http://localhost:8765/MoviePlex-User-Micro/api/user";
  userdata = [];
  userModel: UserModel;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getUserDetail(userId: string){
    return this.http.get(this.USER_URL+"/get/"+userId);
  }

  doModifyUser(data:any){
    return this.http.put(this.USER_URL+"/modify-user", data);
  }

 /* getAllUserList(){
    return this.http.get(this.USER_URL+"/get-all");
  }*/

  getAllUserList():Observable<any>{
    return this.http.get(this.USER_URL+"/get-all").pipe(
      map((res) => {
        return res;
      })
    )
  }

  /*getUserProfile(id): Observable<any> {
    let api = this.USER_URL+"/get-all";
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      map((err)=>{
        alert(err);
      }
      )
      )
  }*/

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
