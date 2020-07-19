import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MessageDialogComponent } from 'src/app/components/utility-components/dialogs/message-dialog/message-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<MessageDialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(MessageDialogComponent, {    
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
