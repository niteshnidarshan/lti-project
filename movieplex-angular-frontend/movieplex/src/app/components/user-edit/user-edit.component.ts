import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PickDateAdapter, PICK_FORMATS, DateValidator } from '../register/PickDateAdapter';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/http-services/user-service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class UserEditComponent implements OnInit {

  userEditForm: FormGroup;   
  userData: any;
  isUserCanceled: boolean;
  updateInfo: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private mdDialogRef: MatDialogRef<UserEditComponent>) {  
    
  }

  ngOnInit(): void {
    
    this.userData = this.userService.getUserData();  
    this.validateForm(); 

  }

  validateForm(){
    this.userEditForm = this.formBuilder.group({
      "firstName": new FormControl(this.userData[0].firstName,Validators.required),
      "lastName": new FormControl(this.userData[0].lastName),
      "gender": new FormControl(this.userData[0].gender, Validators.required),
      "dob": new FormControl(this.userData[0].dob, [Validators.required]),
      "email": new FormControl(this.userData[0].email), 
      "mobile": new FormControl(this.userData[0].mobile),
      "location": new FormControl(this.userData[0].location)
    });
  }

  public cancel() {
    this.isUserCanceled = true;
    this.mdDialogRef.close(false);
  }
   
  doUpdate(){
    //alert("Jai Ram G ki");
    let values = {
      userId:this.userData[0].userId,
      firstName:this.userEditForm.controls['firstName'].value,
      lastName:this.userEditForm.controls['lastName'].value,
      gender:this.userEditForm.controls['gender'].value,
      dob:this.userEditForm.controls['dob'].value,
      email:this.userEditForm.controls['email'].value, 
      mobile:this.userEditForm.controls['mobile'].value,
      location:this.userEditForm.controls['location'].value
    }; 
    
   if(!this.isUserCanceled){
      this.userService.doModifyUser(values).subscribe(
        (success) => {
          this.updateInfo = "Record updated successfully!";
            
        },
        (err) => {
          this.updateInfo = err.error.message; 
        }
      ); 
   } 
  }

  dateFormater(date:string):string{    
    const today = new Date(date);        
    const day = today.getDate(); 
    const month = today.getMonth()+1;
    const year = today.getFullYear();
 
    return year + "-" + (month<10 ? ("0" + month) : month)+ "-" + (day<10 ? ("0" + day) : day);    
  }


}
