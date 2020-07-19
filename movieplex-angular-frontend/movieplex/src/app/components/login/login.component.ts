import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { LoginService } from 'src/app/services/http-services/login-service/login.service';
import { UserService } from 'src/app/services/http-services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: FormControl;
  password: FormControl;
  loginFormGroup: FormGroup;
  user: any; 

  constructor(public formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private dialogService: MessageDialogService) {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', Validators.required);
    this.loginFormGroup = formBuilder.group({
      "email": this.email,
      "password": this.password
    });
   }

  ngOnInit(): void {
  }

  // code segments for password hide/show functionality starts
  hide:boolean = true;
  get emailInput() { 
    return this.email.value;
  }

  get passwordInput() { 
    return this.password.value; 
  } 
// code segments for password hide/show functionality ends


  doLogin(){
    let loginModel: LoginModel = new LoginModel(this.email.value, this.password.value);
    this.loginService.doLogin(loginModel).subscribe(
      (success) => {  
        this.user = success;  
      
        sessionStorage.setItem("userId", this.user.userId);
        sessionStorage.setItem("userName", this.user.firstName+" "+this.user.lastName); 
         
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
}
