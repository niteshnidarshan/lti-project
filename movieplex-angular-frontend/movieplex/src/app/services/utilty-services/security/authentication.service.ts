import { Injectable } from '@angular/core';
import { LoginService } from '../../http-services/login-service/login.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { Router } from '@angular/router';
import { MessageDialogService } from '../dialog/message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;

  constructor(private loginService: LoginService, private router: Router, private dialogService: MessageDialogService) { }

  doLogin(email: string, password: string){
    let loginModel: LoginModel = new LoginModel(email, password);
    this.loginService.doLogin(loginModel).subscribe(
      (success) => {  
        this.user = success;  
      
        sessionStorage.setItem("userId", this.user.userId);
        sessionStorage.setItem("userName", this.user.firstName+" "+this.user.lastName); 
        sessionStorage.setItem("userType", this.user.userType);
 
         
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
    let userId = sessionStorage.getItem("userId");
     
    if(userId == null){
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
}
