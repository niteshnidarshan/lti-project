import { Injectable } from '@angular/core';
import { LoginService } from '../../http-services/login-service/login.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { Router } from '@angular/router';
import { MessageDialogService } from '../dialog/message-dialog.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 // endpoint: string = "http://localhost:8765";
 // headers = new HttpHeaders().set('Content-Type', 'application/json');
 // currentUser = {};
  user: any;

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router, private dialogService: MessageDialogService) { }

  /*doLogin(email: string, password: string){this.signIn(email, password);}
  // Sign-in
  signIn(email: string, password: string) {

    let loginModel: LoginModel = new LoginModel(email, password);
     
    return this.http.post<any>(`${this.endpoint}/authenticate`, loginModel)
      .subscribe((res: any) => {
        console.log(res);
        console.log(res.token);
        localStorage.setItem('access_token', res.token)
        //this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
         // this.router.navigate(['user-profile/' + res.msg._id]);
       // })
      })

    //let authToken = "Bearer "+ + window.btoa(loginModel.username + ":" + loginModel.password);
   // let authToken = window.btoa(loginModel.username + ":" + loginModel.password);
   // let headers = new HttpHeaders();
   // headers.append('Content-Type', 'application/json');
   // console.log(authToken);

   // let headers = new HttpHeaders({
   //   Authorization: authToken
   // });
   
   
   
   /*return this.http.post(`${this.endpoint}/authenticate`, loginModel, {headers:headers}).subscribe((res) => {
      var payload = res; 
      console.log(payload); 
    });
    



   return this.http.post(`${this.endpoint}/authenticate`, loginModel,{responseType:'text', observe: 'response'})
   .subscribe(
     (res) => {//console.log("res = "+JSON.stringify(res)); 
     //console.log(res.headers.get('X-Token'));
     let output1 = res;
        console.log(JSON.stringify(output1.body));
        console.log(JSON.stringify(output1.headers.get('Authorization')));
     }
   );
*/

    /*.pipe(
      map(
        (success) =>{alert(success);
          console.log("success data = "+success);
          return true;
        }
      ),
      map(
        (err) => {
          console.log(err);
          return true;
        }
      ) 
    );*/
  //}
  
  doLogin(email: string, password: string){
    let loginModel: LoginModel = new LoginModel(email, password);
    this.loginService.doLogin(loginModel).subscribe(
      (success) => {
        this.user = success;  
      
        sessionStorage.setItem("userId", this.user.userId);
        sessionStorage.setItem("userName", this.user.firstName+" "+this.user.lastName); 
        sessionStorage.setItem("userType", this.user.userType);
        sessionStorage.setItem("token", this.user.token);
 
         
        this.router.navigate(['/home']);
      },
      (err) => { 
        let options = {
          title: 'MoviePlex Login',
          message1: err.error.message,
          message2: "Kindly login with valid Email Id & Password.",
          cancelText: 'Ok',
          confirmText: 'Ok'
        };
   
        this.dialogService.open(options);
      }
    );
  }
  doLogOut(){
    sessionStorage.clear();
  }

  isUserLoggedIn(): boolean{
    //If userId exist, means user is logged in
    let token = sessionStorage.getItem("token");
     
    if(token == null){
      return false;
    }
    else{
      return true;
    } 
  }
  isUserAdmin(): boolean{
    let userType = sessionStorage.getItem("userType"); 
    if(userType == "ADMIN"){  
      return true;
    }
    else{
      return false;
    } 
  }
  isUserSuperUser(): boolean{
    let userType = sessionStorage.getItem("userType"); 
    if(userType == "SUPER_USER"){ 
      return true;
    }
    else{
      return false;
    } 
  }

  getToken() {
    return sessionStorage.getItem("token");
  }
}
