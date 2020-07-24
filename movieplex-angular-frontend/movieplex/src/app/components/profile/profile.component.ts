import { Component, OnInit } from '@angular/core'; 
import { UserService } from 'src/app/services/http-services/user-service/user.service';
import { UserEditService } from 'src/app/services/http-services/user-service/user-edit.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(private userService: UserService, private userEdit: UserEditService) { 
     
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(){
    this.userService.getUserDetail(sessionStorage.getItem("userId")).subscribe(
      (data) => {
        this.userData = data; 
        this.userService.clearUserData();
        this.userService.addUserData(this.userData); 
      }
    );
  }

  openUserEditDialog(){
    let options = {
      title: 'Movieplex User Update',
      message1: "Jai Ram G Ki",
      message2: "",
      cancelText: 'Ok',
      confirmText: 'Ok'
    };

    this.userEdit.open(options); 
    this.userEdit.confirmed().subscribe(confirmed => {
      //if (confirmed) {  
          // If updated reload data grid
          this.refreshProfile();
       //}
    });
  }

  refreshProfile(){
    this.loadUserProfile();
  }
   
}
