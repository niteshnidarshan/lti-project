import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserAdminDialogComponent } from './user-admin-dialog/user-admin-dialog.component';
import { UserAdminDialogService } from 'src/app/services/http-services/user-admin-dialog/user-admin-dialog.service';
import { UserService } from 'src/app/services/http-services/user-service/user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersList: any;
  displayedColumns: string[] = [
       // 'userId',
        'firstName',
        'lastName',
        'gender',
        'dob',
        //'age',
        'email',
        'mobile',
        //'password',
        'location',
        'userType',
        'isAlive',
        //'mPlexList',
        'profileCreationTimeStamp',
        'profileLastModifiedTimeStamp'
      ]; 
  ELEMENT_DATA = new Array<UserModel>();
  dataSource: any;
/* code for data list
  myControl = new FormControl();
  options: any =[];
  filteredOptions: Observable<any[]>;
*/
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UserService, private userAdminDialog: UserAdminDialogService) { 
    this.loadData();
     
    
  }

  ngOnInit(): void {
    
  } 
  /* code for data list
  autoCom(){
    alert(this.options);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.options.filter(option => { 
      option.toLowerCase().indexOf(filterValue) === 0 
    }); 
  }
 */

  loadData(){
    this.userService.getAllUserList().subscribe((result) => {
      this.usersList = result;   
      this.parseElement();
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
    });
    
  }

  parseElement(){ 
    var i = 0; 
    for(let data of this.usersList){ 
      this.ELEMENT_DATA[i] = (new UserModel(
        data.userId,
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        data.age,
        data.email,
        data.mobile,
        data.password,
        data.location,
        data.userType, 
        data.isAlive,
        null,//data.mPlexList,
        data.profileCreationTimeStamp,
        data.profileLastModifiedTimeStamp
      ));

        //this.options.push((data.userId==undefined)?"":data.userId);
       // this.options.push(((data.firstName==undefined)?" ":data.firstName));
        //this.options.push(data.lastName==undefined?" ":data.lastName);
        //this.options.push(data.gender);
        //this.options.push(data.dob);
        //this.options.push(data.age);
        //this.options.push(data.email);
        //this.options.push(data.mobile);
        
        //this.options.push(data.location);
        //this.options.push(data.userType);
        //this.options.push(data.isAlive);
         
        //this.options.push(data.profileCreationTimeStamp);
        //this.options.push(data.profileLastModifiedTimeStamp);
      
      //let obj:any = JSON.parse(data);  
      //for(var j in obj) 
        // this.options.push(obj[j+1]); 

        i++;
        
        
        
        //this.getBoxes(data); 
        //alert(JSON.stringify(data));
        //alert(obj);
        
    } 
   // this.autoCom();
  }
  getRecord(row){ 
    let userObj: UserModel = new UserModel(
        row.userId,
        row.firstName,
        row.lastName,
        row.gender,
        row.dob,
        row.age,
        row.email,
        row.mobile,
        row.password,
        row.location,
        row.userType,
        row.isAlive,
        row.mPlexList,
        row.profileCreationTimeStamp,
        row.profileLastModifiedTimeStamp
      ); 
      this.userService.addUserModel(userObj);
      let options = {
        title: 'User Type Modification for '+row.firstName+' '+row.lastName,
        message1: row.userId,
        message2: '',
        cancelText: 'Cancel',
        confirmText: 'Update',
      };
 
      this.userAdminDialog.open(options);
      
      this.userAdminDialog.confirmed().subscribe(confirmed => {
        if (confirmed) { 
            // If updated reload data grid
            this.loadData();
           }
        });
      } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
