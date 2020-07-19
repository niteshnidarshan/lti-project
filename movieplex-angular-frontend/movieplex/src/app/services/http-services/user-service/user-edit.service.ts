import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UserEditComponent } from 'src/app/components/user-edit/user-edit.component';
@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  dialogRef: MatDialogRef<UserEditComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options) {
    this.dialogRef = this.dialog.open(UserEditComponent, {    
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
