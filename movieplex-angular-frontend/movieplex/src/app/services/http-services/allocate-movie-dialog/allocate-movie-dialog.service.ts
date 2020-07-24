import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AllocatMovieComponent } from 'src/app/components/management/multiplex/screen/allocat-movie/allocat-movie.component';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllocateMovieDialogService {

  dialogRef: MatDialogRef<AllocatMovieComponent>; 

  constructor(private dialog: MatDialog) { }

  public open(options) {
    this.dialogRef = this.dialog.open(AllocatMovieComponent, {    
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
