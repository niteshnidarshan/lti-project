import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/http-services/user-service/user.service';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-user-admin-dialog',
  templateUrl: './user-admin-dialog.component.html',
  styleUrls: ['./user-admin-dialog.component.css']
})
export class UserAdminDialogComponent implements OnInit {

  options: FormGroup; 
  message: string;
  userObj: UserModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message1: string,
    message2: string,
    title: string
  }, private formBuilder: FormBuilder, private mdDialogRef: MatDialogRef<UserAdminDialogComponent>, private userService: UserService) {
    
    this.userObj=   this.userService.getUserModel();
    this.validateForm();
  }

  validateForm(){
    this.options = this.formBuilder.group({
      "userControl": new FormControl(this.userObj.userType, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    //To update user type in DB record
    //Selected userType

    let userType = this.options.controls['userControl'].value;
     
    if (userType != '') {
      //set userType value in User intity
      this.userObj.userType = userType;
      //Call update service to update userType
      this.userService.doModifyUser(this.userObj).subscribe(
        (success) => {
          this.message = "User Type updated successfully!"
        },
        (err) => {
          this.message = "User Type could not be updated. "+err.error.message;
        }
      );
      this.close(true);
    } else {
      this.message = "Kindly select User Type to update."
      return false;
    }
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

  cleanMessage() {
    this.message = "";
  }

}
