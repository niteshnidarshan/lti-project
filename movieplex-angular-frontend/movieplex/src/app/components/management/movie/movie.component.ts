import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MovieModel } from 'src/app/models/MovieModel';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovieEditComponent } from './movie-edit/movie-edit.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  /* Movie Entry starts*/
 /* movieAddForm: FormGroup;
  updateInfo: string;
  movieData: MovieModel;
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
  ];*/
  /* Movie Entry ends */

  /* Modify starts */
  /*movieList: any;
  displayedColumns: string[] = [
    'movieId',
    'name',
    'category',
    'casts',
    'producer',
    'director',
    'length',
    'language',
    'trailer',
    'posterURL',
    'imdbRating',
    'userRating', 
    'releaseDate',
    'movieAddedBy',
    'isAlive',
    'movieCreationTimeStamp',
    'movieLastModifiedTimeStamp'  
  ]; 
  ELEMENT_DATA = new Array<MovieModel>();
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  */
  /* Modify ends */



  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private dialogService: MessageDialogService) {
    //this.validateForm();
   // this.loadData();
   }

  ngOnInit(): void {
    
  }

  movieTabSelect($event, edit){ 
    if($event.index==1){
      //to load refreshed records on edit tab - need to load the MovieEditComponent
      //For this need to call its method-getLoad()
      //To call one component method in another component need to put a #argument with its selector tag then its method can be called
      //see movieTabSelect(-,-) origin in html
      edit.loadData();
    }
  }
  /* Modify starts */
/*
  loadData(){
    this.movieService.getAllMovies().subscribe((result) => {
      this.movieList = result;  
      this.parseElement();
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
    });
  }

  parseElement(){ 
    var i = 0; 
    for(let data of this.movieList){
      this.ELEMENT_DATA[i] = (new MovieModel(
        data.movieId,
        data.name,
        data.category,
        data.casts,
        data.producer,
        data.director,
        data.length,
        data.language,
        data.trailer,
        data.posterURL,
        data.imdbRating,
        data.userRating, 
        data.releaseDate,
        data.movieAddedBy,
        data.isAlive,
        data.movieCreationTimeStamp,
        data.movieLastModifiedTimeStamp  
        ));
        i++;
    }

  }

  getRecord(data){
   
    let userObj: MovieModel = new MovieModel(
        data.movieId,
        data.name,
        data.category,
        data.casts,
        data.producer,
        data.director,
        data.length,
        data.language,
        data.trailer,
        data.posterURL,
        data.imdbRating,
        data.userRating, 
        data.releaseDate,
        data.movieAddedBy,
        data.isAlive,
        data.movieCreationTimeStamp,
        data.movieLastModifiedTimeStamp
      );
      alert(userObj.name);*/
      /* 
      let options = {
        title: 'User Type Modification for '+row.firstName+' '+row.lastName,
        message1: row.userId,
        message2: '',
        cancelText: 'Cancel',
        confirmText: 'Update',
      };
 
      this.userEditService.open(options);
      
      this.userEditService.confirmed().subscribe(confirmed => {
        if (confirmed) { 
            // If updated reload data grid
            this.loadData();
           }
         });*/
 /* } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/

  /* Modify ends */

  /* Movie Entry start */
  /*validateForm(){
    this.movieAddForm = this.formBuilder.group({
      "name": new FormControl('',Validators.required),
      "category": new FormControl(),
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

  addMovie(){
    let category:string = ""; 
     this.movieAddForm.controls['category'].value.forEach(element => {
       category = category+" "+element;
     });

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
      this.movieAddForm.controls['posterURL'].value,
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


  }*/
  /* Movie Entry ends */ 

}
