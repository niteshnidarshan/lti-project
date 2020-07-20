import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MovieModel } from 'src/app/models/MovieModel';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MulticastOperator } from 'rxjs/internal/operators/multicast';
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

//  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
//  files  = []; 

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
      "image": new FormControl(null, [Validators.required, requiredFileType('jpg')]) 
    });
  }

  /*uploadFile(event) {alert("y");
    const file = (event.target as HTMLInputElement).files[0];
    this.movieAddForm.patchValue({
      posterURLs: file
    });
    this.movieAddForm.get('posterURLs').updateValueAndValidity()
  }*/
  addMovie(){ 
    let category:string = ""; 
    let categories = this.movieAddForm.controls['category'].value;
    if(categories.length>0){
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
      alert(this.movieDataResponse.movieId); 
      //this.uploadPoster(this.movieAddForm.controls['posterURL'].value, this.movieDataResponse.movieId);
      //this.uploadPoster(this.fileUpload.nativeElement, this.movieDataResponse.movieId);
      //this.uploadPoster(this.posterURLs, this.movieDataResponse.movieId);
      //this.onUpload(this.movieDataResponse.movieId);
      this.submitImage(this.movieDataResponse.movieId);
      let options = {
        title: 'Movie Entry',
        message1: "Movie added successfully.",
        message2: "",
        cancelText: 'Ok',
        confirmText: 'Ok'
      };
 
      this.dialogService.open(options);
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

  submitImage(movieId: string) {alert("done!");
    this.movieService.uploadPoster(toFormData(this.movieAddForm.value), movieId).pipe(
      uploadProgress(progress => (this.percentDone = progress)),
      toResponseBody()
    ).subscribe(response => {alert("response = "+response);
      this.progress = 0;
      this.movieAddForm.reset();
      // do something with the response
    });
    /*this.http.post('http://...', toFormData(this.signup.value), {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      uploadProgress(progress => (this.percentDone = progress)),
      toResponseBody()
    ).subscribe(response => {
      this.progress = 0;
      this.signup.reset();
      // do something with the response
    });*/
    /*this.movieService.uploadPoster(formData, movieId).pipe(  
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
      });*/
  }

 /* uploadPoster(file, movieId: string) {  alert("x");
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
  }*/
/*
  onUpload(movieId: string) {  
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
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
  }*/
  
}
