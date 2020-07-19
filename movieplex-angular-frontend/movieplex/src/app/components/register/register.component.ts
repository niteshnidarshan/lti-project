import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NativeDateAdapter, DateAdapter,MAT_DATE_FORMATS } from '@angular/material/core';
import { PickDateAdapter, PICK_FORMATS, DateValidator } from './PickDateAdapter';
import { RegisterService } from 'src/app/services/http-services/register-service/register.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup; 
  registrationGreetings: any; 

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private dialogService: MessageDialogService) { 
    this.validateForm();
  }

  ngOnInit(): void {
  }

  validateForm(){
    this.registerForm = this.formBuilder.group({
      "firstName": new FormControl('',Validators.required),
      "lastName": new FormControl(),
      "gender": new FormControl('Male', Validators.required),
      "dob": new FormControl('', [Validators.required, DateValidator()]),
      "email": new FormControl('', [Validators.email, Validators.required]),
      "password": new FormControl('',[Validators.minLength(3), Validators.required]),
      "mobile": new FormControl(),
      "location": new FormControl()
    });
  }

  // code segments for password hide/show functionality starts
  hide:boolean = true;
  get emailInput() { 
    return this.registerForm.controls['email'].value;
  }

  get passwordInput() { 
    return this.registerForm.controls['password'].value; 
  } 
  // code segments for password hide/show functionality ends

  doRegister(){
    //alert("Jai Ram G ki");
    let values = {
      userId:"",
      firstName:this.registerForm.controls['firstName'].value,
      lastName:this.registerForm.controls['lastName'].value,
      gender:this.registerForm.controls['gender'].value,
      dob:this.registerForm.controls['dob'].value,
      email:this.registerForm.controls['email'].value,
      password:this.registerForm.controls['password'].value,
      mobile:this.registerForm.controls['mobile'].value,
      location:this.registerForm.controls['location'].value
    }; 
    //var date = values.dob.getFullYear()+'-'+(values.dob.getMonth()+1)+'-'+values.dob.getDate();
    //var date = values.dob.getDate()+'-'+(values.dob.getMonth()+1)+'-'+values.dob.getFullYear();
   // values.dob = this.dateFormater(values.dob);
    //alert(JSON.stringify(values)); 
    this.registerService.registerUser(values).subscribe(
      (success) => {
        //return message 
      this.registrationGreetings = success; 
      this.registrationGreetings = "Welcome "+this.registrationGreetings.firstName+" "+this.registrationGreetings.lastName+"!";
      
      let options = {
        title: 'Registration',
        message1: this.registrationGreetings,
        message2: "Now login and book Movie!!",
        cancelText: 'Ok',
        confirmText: 'Ok'
      };
 
      this.dialogService.open(options);
      
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
             //alert("Jai Ram G ki");
             //After clicking Ok on message dialog, form should reset
             this.registerForm.reset();
           }
         });
      },//end of success
      (err) => { 
        let options = {
          title: 'Movieplex Registration',
          message1: err.error.message,
          message2: "",
          cancelText: 'Ok',
          confirmText: 'Ok'
        };
   
        this.dialogService.open(options);
        
        this.dialogService.confirmed().subscribe(confirmed => {
          if (confirmed) {
               //alert("Jai Ram G ki");
               //After clicking Ok on message dialog, form should reset
               this.registerForm.controls.email.reset();
             }
           });
        
      }
    );
  }

  dateFormater(date:string):string{    
    const today = new Date(date);        
    const day = today.getDate(); 
    const month = today.getMonth()+1;
    const year = today.getFullYear();
 
    return year + "-" + (month<10 ? ("0" + month) : month)+ "-" + (day<10 ? ("0" + day) : day);    
  }

  
}
