import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MovieModel } from 'src/app/models/MovieModel';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http'; 
import { requiredFileType } from 'src/app/file-upload/file-upload/requiredFileType';
import { toFormData } from 'src/app/file-upload/file-upload/toFormData';
import { uploadProgress } from 'src/app/file-upload/file-upload/uploadProgress';
import { toResponseBody } from 'src/app/file-upload/file-upload/toResponseBody';

@Component({
  selector: 'app-movie-entry',
  templateUrl: './movie-entry.component.html',
  styleUrls: ['./movie-entry.component.css']
})
export class MovieEntryComponent implements OnInit {
 
progress = 0;
percentDone = 0;
  posterURLs: File;
  movieAddForm: FormGroup;
  updateInfo: string;
  movieData: MovieModel;
  movieDataResponse: any; 
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

  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private dialogService: MessageDialogService) { 
    this.validateForm(); 
  }

  ngOnInit(): void {
  }

  validateForm(){
    this.movieAddForm = this.formBuilder.group({
      "name": new FormControl('',Validators.required),
      "category": new FormControl(),
      "casts": new FormControl(),
      "producer": new FormControl(),
      "director": new FormControl(), 
      "length": new FormControl(),
      "language": new FormControl(), 
      "trailer": new FormControl(),
      "posterURL": [null],
      "imdbRating": new FormControl(), 
      "releaseDate": new FormControl(),
      //"image": new FormControl(null, [Validators.required, requiredFileType('jpg')]) 
      "image": new FormControl(null) 
    });
  }
 
  addMovie(){ 
    let category:string = ""; 
    let categories = this.movieAddForm.controls['category'].value; 
    if(categories != null && categories.length>0){
     this.movieAddForm.controls['category'].value.forEach(element => {
       category = category+" "+element;
     });
    }
    else{
      category = categories;
    }

    let movieModel: MovieModel = new MovieModel(
      "",//Movie Id should be null on entry
      this.movieAddForm.controls['name'].value,
      category,
      this.movieAddForm.controls['casts'].value,
      this.movieAddForm.controls['producer'].value,
      this.movieAddForm.controls['director'].value,
      this.movieAddForm.controls['length'].value,
      this.movieAddForm.controls['language'].value,
      this.movieAddForm.controls['trailer'].value,
      "",//this.movieAddForm.controls['posterURL'].value,
      this.movieAddForm.controls['imdbRating'].value,
      0.0, //User rating - initailly 0
      this.movieAddForm.controls['releaseDate'].value,
      sessionStorage.getItem("userId"),
      true,
      '', //Creation date - handeled by API
      '' //Modification date - handeled by API
    );

    
  this.movieService.addMovie(movieModel).subscribe(
    (success) => {
      this.movieDataResponse = success;   
      
      if(this.movieAddForm.controls['image'].value != null){
        this.submitImage(this.movieDataResponse.movieId);
      }

      let options = {
        title: 'Movie Entry',
        message1: "Movie added successfully.",
        message2: "",
        cancelText: 'Ok',
        confirmText: 'Ok'
      };
 
      this.dialogService.open(options);
      this.movieAddForm.reset();
    },
    (err) => {
      let options = {
        title: 'Movie Entry',
        message1: err.error.message,
        message2: "",
        cancelText: 'Ok',
        confirmText: 'Ok'
      };
 
      this.dialogService.open(options);
    }
  );


  } 
  submitImage(movieId: string) {
    this.movieService.uploadPoster(toFormData(this.movieAddForm.value), movieId).pipe(
      uploadProgress(progress => (this.percentDone = progress)),
      toResponseBody()
    ).subscribe(event => {  
        this.movieAddForm.reset(); 
    },
    (err) => {
      alert("File could not be saved ... "+err.error.message);
    }
    
    );
     
  } 
}
