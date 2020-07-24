import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserAdminDialogComponent } from 'src/app/components/management/user/user-admin-dialog/user-admin-dialog.component';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAdminDialogService {
  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<UserAdminDialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(UserAdminDialogComponent, {    
      data: {
        title: options.title,
        message1: options.message1,
        message2: options.message2,
        cancelText: options.cancelText,
        confirmText: options.confirmText 
      }
 });  
  }  
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
  ));
  }
}
