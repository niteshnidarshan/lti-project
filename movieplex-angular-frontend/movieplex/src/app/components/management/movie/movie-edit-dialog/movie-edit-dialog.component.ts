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
import { requiredFileType } from 'src/app/file-upload/file-upload/requiredFileType';
import { toFormData } from 'src/app/file-upload/file-upload/toFormData';
import { uploadProgress } from 'src/app/file-upload/file-upload/uploadProgress';
import { toResponseBody } from 'src/app/file-upload/file-upload/toResponseBody';

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

  currentPosterUrl: string;
  progress = 0;
  percentDone = 0;
  posterURLs: File;
  movieReqData: any;
  movieResData: any;
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
    let movieCategories:[];
    if(this.movieReqData[0].category != null){
      movieCategories = this.movieReqData[0].category.split(" ");
    }
    else{
      movieCategories = this.movieReqData[0].category;
    }

    //To Show Poster 
    this.currentPosterUrl = this.movieReqData[0].posterURL; 

    this.movieEditForm = this.formBuilder.group({
      "name": new FormControl(this.movieReqData[0].name,Validators.required),
      "category": new FormControl(movieCategories),
      "casts": new FormControl(this.movieReqData[0].casts),
      "producer": new FormControl(this.movieReqData[0].producer),
      "director": new FormControl(this.movieReqData[0].director), 
      "length": new FormControl(this.movieReqData[0].length),
      "language": new FormControl(this.movieReqData[0].language), 
      "trailer": new FormControl(this.movieReqData[0].trailer),
      "posterURL": new FormControl(this.movieReqData[0].posterURL),
      "imdbRating": new FormControl(this.movieReqData[0].imdbRating), 
      "releaseDate": new FormControl(this.movieReqData[0].releaseDate),
      //"image": new FormControl(null, [Validators.required, requiredFileType('jpg')])  
      "image": new FormControl(null)  
    });
  }

  public confirm(){
    let category:string = ""; 
    let categories = this.movieEditForm.controls['category'].value; 
    if(categories != null && categories.length>0){
     this.movieEditForm.controls['category'].value.forEach(element => {
       category = category+" "+element;
     });
    }

    let movieModel: MovieModel = new MovieModel(
      this.movieReqData[0].movieId,//Movie Id should be null on entry
      this.movieEditForm.controls['name'].value,
      category,
      this.movieEditForm.controls['casts'].value,
      this.movieEditForm.controls['producer'].value,
      this.movieEditForm.controls['director'].value,
      this.movieEditForm.controls['length'].value,
      this.movieEditForm.controls['language'].value,
      this.movieEditForm.controls['trailer'].value,
      "",//this.movieEditForm.controls['posterURL'].value,
      this.movieEditForm.controls['imdbRating'].value,
      this.movieReqData[0].userRating, //Should not be updated by admin
      this.movieEditForm.controls['releaseDate'].value,
      sessionStorage.getItem("userId"),
      true,
      '', //Creation date - handeled by API
      '' //Modification date - handeled by API
    );
    
  this.movieService.modifyMovie(movieModel).subscribe(
    (success) => { 
      //this.movieResData = success;
      if(this.movieEditForm.controls['image'].value != null){
        this.submitImage(movieModel.movieId);
      } 
      this.updateInfo = "Movie Updated successfully!";
      this.close(true);
    },
    (err) => {
      this.updateInfo = "Something wrong on movie update! ["+err.error.message+"]";
    }
  ); 
  
}
public close(value) {
  this.movieDialogRef.close(value);
}
submitImage(movieId: string) {
  this.movieService.uploadPoster(toFormData(this.movieEditForm.value), movieId).pipe(
    uploadProgress(progress => (this.percentDone = progress)),
    toResponseBody()
  ).subscribe(event => {  
    this.updateInfo = "Movie Updated successfully! ";
  },
  (err) => {
    this.updateInfo = "File could not be saved ... ["+err.error.message+"]";
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

}
