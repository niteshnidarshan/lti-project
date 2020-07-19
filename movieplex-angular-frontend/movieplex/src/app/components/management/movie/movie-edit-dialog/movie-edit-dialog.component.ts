import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/components/register/PickDateAdapter';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieModel } from 'src/app/models/MovieModel';
import { MovieEditDialogService } from 'src/app/services/http-services/movie-edit-dialog-service/movie-edit-dialog.service';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-movie-edit-dialog',
  templateUrl: './movie-edit-dialog.component.html',
  styleUrls: ['./movie-edit-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class MovieEditDialogComponent implements OnInit {


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 

  movieReqData: any;
  isMovieEditCanceled: boolean;
  movieEditForm: FormGroup;
  updateInfo: string;
  movieData: MovieModel;
  reqMovieId: string;
  movieCategories: string[] = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western"
  ];

  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private movieDialogRef: MatDialogRef<MovieEditDialogComponent>) { 
    this.movieReqData = movieService.getMovieData(); 
    this.reqMovieId = this.movieReqData[0].movieId;
    this.validateForm();
  }

  ngOnInit(): void { 
  }

  public cancel() { 
    this.isMovieEditCanceled = true;
    this.movieDialogRef.close(false);
  }

  validateForm(){
    let movieCategories:[] = this.movieReqData[0].category.split(" ");

    this.movieEditForm = this.formBuilder.group({
      "name": new FormControl(this.movieReqData[0].name,Validators.required),
      "category": new FormControl(movieCategories),
      "casts": new FormControl(),
      "producer": new FormControl(),
      "director": new FormControl(), 
      "length": new FormControl(),
      "language": new FormControl(), 
      "trailer": new FormControl(),
      "posterURL": new FormControl(),
      "imdbRating": new FormControl(), 
      "releaseDate": new FormControl() 
    });
  }

  editMovie(){
    let category:string = ""; 
     this.movieEditForm.controls['category'].value.forEach(element => {
       category = category+" "+element;
     });

    let movieModel: MovieModel = new MovieModel(
      "",//Movie Id should be null on entry
      this.movieEditForm.controls['name'].value,
      category,
      this.movieEditForm.controls['casts'].value,
      this.movieEditForm.controls['producer'].value,
      this.movieEditForm.controls['director'].value,
      this.movieEditForm.controls['length'].value,
      this.movieEditForm.controls['language'].value,
      this.movieEditForm.controls['trailer'].value,
      this.movieEditForm.controls['posterURL'].value,
      this.movieEditForm.controls['imdbRating'].value,
      0.0, //User rating - initailly 0
      this.movieEditForm.controls['releaseDate'].value,
      sessionStorage.getItem("userId"),
      true,
      '', //Creation date - handeled by API
      '' //Modification date - handeled by API
    );
    
  this.movieService.addMovie(movieModel).subscribe(
    (success) => { 
    },
    (err) => {
       
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

  onClick(movieId: string) {  
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
    for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }   
    this.uploadFiles(movieId); 
    };  
    fileUpload.click();  
}

  uploadFile(file, movieId: string) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.movieService.uploadPoster(formData, movieId).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }
  private uploadFiles(movieId: string) {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file, movieId);  
    });  
  }

}
