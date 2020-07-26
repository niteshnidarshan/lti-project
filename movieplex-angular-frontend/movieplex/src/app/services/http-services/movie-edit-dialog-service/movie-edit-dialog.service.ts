import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MovieEditDialogComponent } from 'src/app/components/management/movie/movie-edit-dialog/movie-edit-dialog.component';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MovieModel } from 'src/app/models/MovieModel';

@Injectable({
  providedIn: 'root'
})
export class MovieEditDialogService {

  dialogRef: MatDialogRef<MovieEditDialogComponent>; 

  constructor(private dialog: MatDialog) { } 

  public open(options) {
    this.dialogRef = this.dialog.open(MovieEditDialogComponent, {    
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
